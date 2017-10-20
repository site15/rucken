import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@rucken/core';
import { Fontawesome } from '@rucken/core';
import { FontawesomeService } from '@rucken/core';
import { AppService } from '@rucken/core';
import { AccountService } from '@rucken/core';

import { ConfirmModalComponent } from '../..//modals/confirm-modal/confirm-modal.component';
import { BaseResourcesGridComponent } from '../../base/base-resources-grid/base-resources-grid.component';
import { FontawesomeModalComponent } from './fontawesome-modal/fontawesome-modal.component';

@Component({
  selector: 'fontawesomes-grid',
  templateUrl: './fontawesomes-grid.component.html',
  styleUrls: ['./fontawesomes-grid.component.scss'],
  entryComponents: [FontawesomeModalComponent, ConfirmModalComponent]
})

export class FontawesomesGridComponent extends BaseResourcesGridComponent {

  @ViewChild('focusElement')
  focusElement: ElementRef;

  @Output()
  onSelectItems: EventEmitter<any[] | Fontawesome[]>;

  modelMeta: any = Fontawesome.meta();
  items: any[] | Fontawesome[];
  selectedItems: any[] | Fontawesome[];
  cachedResourcesService: FontawesomeService;

  constructor(
    public fontawesomeService: FontawesomeService,
    public accountService: AccountService,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    this.cachedResourcesService = this.fontawesomeService.createCache();
  }
  get account(): any | User {
    return this.accountService.account;
  }
  get readonly() {
    return this.hardReadonly || !this.account.checkPermissions(['add_fontawesome', 'change_fontawesome', 'delete_fontawesome']);
  }
  showCreateModal() {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: FontawesomeModalComponent = this.app.modals(this.resolver).create(FontawesomeModalComponent);
    itemModal.name = 'createFontawesome';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['add_fontawesome']);
    itemModal.text = this.translateService.instant('Create');
    itemModal.title = this.translateService.instant('Create new fontawesome');
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Fontawesome();
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showEditModal(item: any | Fontawesome) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const itemModal: FontawesomeModalComponent = this.app.modals(this.resolver).create(FontawesomeModalComponent);
    itemModal.name = 'editFontawesome';
    itemModal.account = this.accountService.account;
    itemModal.readonly = !this.account.checkPermissions(['change_fontawesome']);
    itemModal.text = this.translateService.instant('Save');
    itemModal.title = this.translateService.instant('Edit fontawesome');
    if (itemModal.readonly) {
      itemModal.title = this.translateService.instant('Fontawesome info');
    }
    itemModal.onOk.subscribe(($event: any) => this.save($event));
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = new Fontawesome(item);
    itemModal.modal.show();
    this.selectedItems = [itemModal.item];
    this.cachedResourcesService.changeStatusItem$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  showRemoveModal(item: any | Fontawesome) {
    if (this.modalIsOpened) {
      return;
    }
    this.modalIsOpened = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent);
    confirm.name = 'removeFontawesome';
    confirm.size = 'md';
    confirm.title = this.translateService.instant('Remove');
    confirm.message = this.translateService.instant('Are you sure you want to remove a fontawesome?');
    confirm.onOk.subscribe(($event: any) => this.remove($event));
    confirm.onClose.subscribe(() => this.focus());
    this.selectedItems = [item];
    confirm.modal.show();
    this.cachedResourcesService.changeStatusItem$.subscribe(status =>
      confirm.okInProcessFromStatus(status)
    );
  }
  save(itemModal: FontawesomeModalComponent) {
    this.cachedResourcesService.save(itemModal.item).subscribe(
      (fontawesome: any | Fontawesome) => {
        itemModal.modal.hide();
      }, (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              itemModal.info.emit({ name: '' });
            });
        } else {
          itemModal.errors.emit(errors);
        }
      });
  }
  remove(itemModal: ConfirmModalComponent) {
    this.cachedResourcesService.remove(this.selectedItems).subscribe(
      () => {
        itemModal.modal.hide();
      },
      (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              this.focus();
            });
        } else {
          itemModal.errors.emit(errors);
        }
      });
  }
}
