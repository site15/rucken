import { isSimpleTemplateString } from 'codelyzer/util/utils';
import { Permission } from '../../../shared/models/permission.model';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { PermissionsListModalComponent } from '../permissions-list-modal/permissions-list-modal.component';
import { AppService } from './../../../shared/app.service';
import { AccountService } from './../../../shared/account.service';
import { PermissionsService } from '../../../shared/permissions.service';
import { User } from './../../../shared/models/user.model';
import { ResouceEnumStatus } from './../../../shared/enums/resource.enums';
import { ResourceInputComponent } from '../../resources-grid/resource-input/resource-input.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'permission-input',
  templateUrl: './permission-input.component.html',
  styleUrls: ['./permission-input.component.scss'],
  entryComponents: [PermissionsListModalComponent]
})

export class PermissionInputComponent extends ResourceInputComponent {
  @ViewChild('inputElement')
  inputElement: ElementRef;
  @Input()
  lookupTooltip?: string;
  @Input()
  lookupIcon?: string = 'fa fa-search';
  @Input()
  focused: boolean = false;
  @Input()
  readonly: boolean = false;
  @Input()
  hardReadonly: boolean = false;
  @Input()
  inputReadonly: boolean = true;
  @Input()
  name: string = 'permission';
  @Input()
  placeholder: string = '';
  @Input()
  title: string = '';
  @Input()
  model: Permission = new Permission();
  @Output()
  modelChange: EventEmitter<Permission> = new EventEmitter<Permission>();

  @Input()
  modelAsString: string = '';
  @Output()
  modelAsStringChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
  public items: Permission[];
  public cachedResourcesService: PermissionsService;

  constructor(
    public app: AppService,
    public accountService: AccountService,
    public permissionsService: PermissionsService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super();
    if (this.lookupTooltip === undefined) {
      this.lookupTooltip = this.translateService.instant('Select');
    }
    this.cachedResourcesService = permissionsService.createCache();
  }
  get account(): User {
    return this.accountService.account;
  }
  onLookup() {
    let itemModal: PermissionsListModalComponent =
      this.app.modals(this.resolver).create(PermissionsListModalComponent);
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.account = this.account;
    itemModal.text = this.translateService.instant('Select');
    itemModal.title = this.translateService.instant('Permissions');
    itemModal.onSave.subscribe(($event:any) => {
      this.value = itemModal.item;
      if (this.inputReadonly === false) {
        this.valueAsString = '';
      }
      itemModal.modal.hide();
    });
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = this.value;
    itemModal.modal.show();
  }
}
