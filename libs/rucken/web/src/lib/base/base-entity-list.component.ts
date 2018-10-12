import { EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { ErrorsExtractor, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  IFactoryModel,
  IMockProviderOptions,
  IModel,
  IPaginationMeta,
  IRestProviderOptions,
  Repository
} from 'ngx-repository';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { IBaseEntityListModal } from '../base/base-entity-list-modal.interface';
import { IEntityGridFilter } from '../components/entity-grid/entity-grid-filter.interface';
import { EntityModalComponent } from '../components/entity-modal/entity-modal.component';
import { MessageModalService } from '../modals/message-modal/message-modal.service';
import { IBaseEntityList } from './base-entity-list.interface';
import { IBaseEntityModalOptions, IBaseEntityModals } from './base-entity-modals.interface';

export class BaseEntityListComponent<TModel extends IModel> implements IBaseEntityList<TModel>, IBaseEntityModals {
  @Input()
  modalItem: IBaseEntityModalOptions = {};
  @Input()
  modalDelete: IBaseEntityModalOptions = {};
  @Input()
  modalCreate: IBaseEntityModalOptions = {};
  @Input()
  modalUpdate: IBaseEntityModalOptions = {};
  @Input()
  modalView: IBaseEntityModalOptions = {};
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {};
  @Input()
  set processing(value: boolean) {
    this.processing$.next(value);
  }
  get processing() {
    return this.processing$.getValue();
  }
  processing$ = new BehaviorSubject(false);
  @Input()
  apiUrl?: string;
  @Input()
  set mockedItems(items: TModel[]) {
    this._mockedItems = items;
  }
  get mockedItems() {
    return this._mockedItems;
  }
  @Output()
  mockedItemsChange: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();
  @Input()
  strings: {
    viewTitle?: string;
    createTitle?: string;
    updateTitle?: string;
    deleteTitle?: string;
    deleteMessage?: string;
    selectTitle?: string;
    [key: string]: string;
  };
  @Output()
  selected: EventEmitter<TModel[]> = new EventEmitter<TModel[]>();
  @Input()
  readonly: boolean;
  @Input()
  title: string;
  @Input()
  filter: IEntityGridFilter = { searchText: '', sort: '-id' };

  paginationMeta$: Observable<IPaginationMeta>;
  items$: Observable<TModel[]>;
  createData: any;
  appendFromGridData: any;

  private _mockedItems: TModel[];
  private _selected: TModel[] = [];

  constructor(
    public repository: Repository<TModel>,
    public modalService: BsModalService,
    public factoryModel: IFactoryModel<TModel>,
    protected errorsExtractor?: ErrorsExtractor,
    protected messageModalService?: MessageModalService
  ) {
    if (factoryModel.strings) {
      this.strings = factoryModel.strings;
    } else {
      this.strings = Object.keys(new factoryModel()).reduce((acc, cur, i) => {
        acc[cur] = cur;
        return acc;
      }, {});
    }
  }
  useRest(options?: IRestProviderOptions<TModel>) {
    this.repository.useRest(options);
    this.items$ = this.repository.items$;
    this.paginationMeta$ = this.repository.paginationMeta$;
  }
  useMock(options?: IMockProviderOptions<TModel>) {
    this.repository.useMock(options);
    this.items$ = this.repository.items$;
    this.paginationMeta$ = this.repository.paginationMeta$;
  }
  getSelected() {
    return this._selected;
  }
  onSelected(selected: TModel[]) {
    this._selected = selected;
    this.selected.emit(this._selected);
  }
  onChangePage(meta: { page: number; itemsPerPage: number }) {
    this.repository.setOptions({
      paginationMeta: { curPage: meta.page, perPage: meta.itemsPerPage }
    });
  }
  onChangeFilter(filter?: IEntityGridFilter) {
    if (!filter) {
      filter = {};
    }
    this.processing = true;
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        if (key === 'searchText') {
          this.filter.searchText = typeof filter.searchText === 'string' ? filter.searchText : '';
        } else {
          this.filter[key] = filter[key];
        }
      }
    }
    this.repository
      .loadAll(this.filter)
      .pipe(first())
      .subscribe(items => this.onSuccess(items), error => this.onError(error));
  }
  onReload() {
    this.onChangeFilter();
  }
  onSearch(searchText: string) {
    if (typeof searchText === 'string') {
      this.onChangeFilter({ searchText });
    }
  }
  onChangeOrder(fieldName: string) {
    this.onChangeFilter({ sort: fieldName });
  }
  onSuccess(items: TModel[]) {
    this.processing = false;
  }
  onError(error: any) {
    this.processing = false;
    if (isDevMode()) {
      console.warn('Method "onError" is not defined', this);
    }
    if (this.messageModalService) {
      this.messageModalService
        .error({
          error: error
        })
        .subscribe();
    } else {
      if (isDevMode()) {
        console.warn('MessageModalService is not injected', this);
      }
    }
  }
  defaultCreateViewModal(item: TModel): BsModalRef {
    const title = this.strings && this.strings.viewTitle ? this.strings.viewTitle : translate('Item #{{id}}');
    const bsModalRef = this.modalService.show(
      this.modalView.component || this.modalItem.component || EntityModalComponent,
      {
        class: this.modalView.class || this.modalItem.class || 'modal-md',
        initialState: {
          title: title,
          noTitle: translate('Close'),
          readonly: true,
          data: item,
          apiUrl: this.apiUrl,
          ...(this.modalView.initialState || this.modalItem.initialState)
        }
      }
    );
    const modal = bsModalRef.content as EntityModalComponent;
    modal.group(this.factoryModel);
    modal.data = item;
    return bsModalRef;
  }
  createViewModal(item: TModel): BsModalRef {
    return undefined;
  }
  onViewClick(item: TModel): BsModalRef {
    const useCustomModalComponent = this.modalView.component || this.modalItem.component;
    let bsModalRef = !useCustomModalComponent ? this.createViewModal(item) : undefined;
    if (!bsModalRef) {
      bsModalRef = this.defaultCreateViewModal(item);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createViewModal" is not defined', this);
      }
    }
    return bsModalRef;
  }
  defaultCreateCreateModal(item?: TModel): BsModalRef {
    const title = this.strings && this.strings.createTitle ? this.strings.createTitle : translate('Create new item');
    item = item || new this.factoryModel();
    const bsModalRef = this.modalService.show(
      this.modalCreate.component || this.modalItem.component || EntityModalComponent,
      {
        class: this.modalCreate.class || this.modalItem.class || 'modal-md',
        initialState: {
          title: title,
          yesTitle: translate('Create'),
          data: item,
          apiUrl: this.apiUrl,
          ...(this.modalCreate.initialState || this.modalItem.initialState)
        }
      }
    );
    const modal = bsModalRef.content as EntityModalComponent;
    modal.group(this.factoryModel);
    modal.data = item;
    return bsModalRef;
  }
  createCreateModal(data?: any): BsModalRef {
    return undefined;
  }
  onCreateError(modal: EntityModalComponent, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Method "onCreateError" is not defined', this);
    }
    if (this.errorsExtractor) {
      modal.form.externalErrors = this.errorsExtractor.getValidationErrors(error);
      if (!modal.form.externalErrors) {
        this.onError(error);
      }
    }
  }
  onCreateClick(data?: any): void {
    const useCustomModalComponent = this.modalCreate.component || this.modalItem.component;
    this.createData = data;
    let bsModalRef = !useCustomModalComponent ? this.createCreateModal(data) : undefined;
    if (!bsModalRef) {
      bsModalRef = this.defaultCreateCreateModal(data);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createCreateModal" is not defined', this);
      }
    }
    bsModalRef.content.yes.subscribe((modal: any) => {
      modal.processing = true;
      this.repository.create(modal.data).subscribe(
        createdItem => {
          modal.processing = false;
          if (this.mockedItems) {
            this.mockedItems = this.repository.items;
            this.mockedItemsChange.emit(this.mockedItems);
          }
          modal.hide();
        },
        error => this.onCreateError(modal, error)
      );
    });
  }
  defaultCreateUpdateModal(item: TModel): BsModalRef {
    const title =
      this.strings && this.strings.updateTitle ? this.strings.updateTitle : translate('Update item #{{id}}');
    const bsModalRef = this.modalService.show(
      this.modalUpdate.component || this.modalItem.component || EntityModalComponent,
      {
        class: this.modalUpdate.class || this.modalItem.class || 'modal-md',
        initialState: {
          title: title,
          yesTitle: translate('Save'),
          data: item,
          apiUrl: this.apiUrl,
          ...(this.modalUpdate.initialState || this.modalItem.initialState)
        }
      }
    );
    const modal = bsModalRef.content as EntityModalComponent;
    modal.group(this.factoryModel);
    modal.data = item;
    return bsModalRef;
  }
  createUpdateModal(item: TModel): BsModalRef {
    return undefined;
  }
  onUpdateError(modal: EntityModalComponent, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Method "onUpdateError" is not defined', this);
    }
    if (this.errorsExtractor) {
      modal.form.externalErrors = this.errorsExtractor.getValidationErrors(error);
      if (!modal.form.externalErrors) {
        this.onError(error);
      }
    }
  }
  onUpdateClick(item: TModel): void {
    const useCustomModalComponent = this.modalCreate.component || this.modalItem.component;
    let bsModalRef = !useCustomModalComponent ? this.createUpdateModal(item) : undefined;
    if (!bsModalRef) {
      bsModalRef = this.defaultCreateUpdateModal(item);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createUpdateModal" is not defined', this);
      }
    }
    bsModalRef.content.yes.subscribe((modal: any) => {
      modal.processing = true;
      this.repository.update(item.id, modal.data).subscribe(
        updatedItem => {
          modal.processing = false;
          if (this.mockedItems) {
            this.mockedItems = this.repository.items;
            this.mockedItemsChange.emit(this.mockedItems);
          }
          modal.hide();
        },
        error => this.onUpdateError(modal, error)
      );
    });
  }
  defaultCreateDeleteModal(item: TModel): BsModalRef {
    const title =
      this.strings && this.strings.deleteTitle ? this.strings.deleteTitle : translate('Delete item #{{id}}');
    const message =
      this.strings && this.strings.deleteMessage
        ? this.strings.deleteMessage
        : translate('Do you really want to delete item?');
    const bsModalRef = this.modalService.show(
      this.modalDelete.component || this.modalItem.component || EntityModalComponent,
      {
        class: this.modalDelete.class || this.modalItem.class || 'modal-md',
        initialState: {
          title: title,
          message: message,
          yesTitle: translate('Delete'),
          data: item,
          apiUrl: this.apiUrl,
          ...(this.modalDelete.initialState || this.modalItem.initialState)
        }
      }
    );
    const modal = bsModalRef.content as EntityModalComponent;
    modal.group(this.factoryModel);
    modal.data = item;
    return bsModalRef;
  }
  createDeleteModal(item: TModel): BsModalRef {
    return undefined;
  }
  onDeleteError(modal: EntityModalComponent, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Method "onDeleteError" is not defined', this);
    }
    if (this.errorsExtractor) {
      modal.form.externalErrors = this.errorsExtractor.getValidationErrors(error);
      if (!modal.form.externalErrors) {
        this.onError(error);
      }
    }
  }
  onDeleteClick(item: TModel): void {
    const useCustomModalComponent = this.modalCreate.component || this.modalItem.component;
    let bsModalRef = !useCustomModalComponent ? this.createDeleteModal(item) : undefined;
    if (!bsModalRef) {
      bsModalRef = this.defaultCreateDeleteModal(item);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createDeleteModal" is not defined', this);
      }
    }
    bsModalRef.content.yes.subscribe(modal => {
      modal.processing = true;
      this.repository.delete(item.id).subscribe(
        deletedItem => {
          modal.processing = false;
          if (this.mockedItems) {
            this.mockedItems = this.repository.items;
            this.mockedItemsChange.emit(this.mockedItems);
          }
          modal.hide();
        },
        error => this.onDeleteError(modal, error)
      );
    });
  }
  defaultAppendFromGridModal(data?: any): BsModalRef {
    const title = this.strings && this.strings.selectTitle ? this.strings.selectTitle : translate('Select item');
    const bsModalRef = this.modalService.show(this.modalAppendFromGrid.component, {
      class: this.modalAppendFromGrid.class || this.modalItem.class || 'modal-md',
      initialState: {
        title: title,
        yesTitle: translate('Append'),
        apiUrl: this.apiUrl,
        ...this.modalAppendFromGrid.initialState
      }
    });
    return bsModalRef;
  }
  createAppendFromGridModal(data?: any): BsModalRef {
    return undefined;
  }
  onAppendFromGridError(modal: IBaseEntityListModal<TModel>, error: any) {
    modal.processing = false;
    if (isDevMode()) {
      console.warn('Method "onAppendFromGridError" is not defined', this);
    }
    if (this.errorsExtractor) {
      this.onError(error);
    }
  }
  onAppendFromGridClick(data?: any): void {
    this.appendFromGridData = data;
    const useCustomModalComponent = this.modalAppendFromGrid.component;
    let bsModalRef = !useCustomModalComponent ? this.createAppendFromGridModal(data) : undefined;
    if (!bsModalRef) {
      bsModalRef = this.defaultAppendFromGridModal(data);
      if (isDevMode() && !useCustomModalComponent) {
        console.warn('Method "createAppendFromGridModal" is not defined', this);
        return;
      }
    }
    bsModalRef.content.yes.subscribe((modal: IBaseEntityListModal<TModel>) => {
      modal.processing = true;
      const observables = [];
      const selected = modal.grid.getSelected() as TModel[];
      if (selected) {
        selected.forEach(slectedItem => {
          const foundedGroup = this.mockedItems && this.mockedItems.find(item => item.id === slectedItem.id);
          if (!foundedGroup) {
            observables.push(this.repository.create(slectedItem));
          }
        });
      }
      if (observables.length) {
        forkJoin(...observables).subscribe(
          (modalItems: TModel[]) => {
            modal.processing = false;
            if (this.mockedItems) {
              if (modalItems) {
                modalItems.forEach(modalItem => this.mockedItems.unshift(modalItem));
              }
              this.mockedItemsChange.emit(this.mockedItems);
            }
            modal.hide();
          },
          error => this.onAppendFromGridError(modal, error)
        );
      } else {
        modal.hide();
      }
    });
  }
}