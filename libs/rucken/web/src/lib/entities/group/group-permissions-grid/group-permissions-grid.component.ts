import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, Group, Permission, PERMISSIONS_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions, ProviderActionEnum } from 'ngx-repository';
import { MessageModalService } from '../../../modals/message-modal/message-modal.service';
import { PermissionModalComponent } from '../../permission/permission-modal/permission-modal.component';
import { PermissionsGridModalComponent } from '../../permission/permissions-grid-modal/permissions-grid-modal.component';
import { PermissionsGridComponent } from '../../permission/permissions-grid/permissions-grid.component';

@Component({
  selector: 'group-permissions-grid',
  templateUrl: './group-permissions-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPermissionsGridComponent extends PermissionsGridComponent
  implements OnInit {
  @Input()
  group: Group;

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(PERMISSIONS_CONFIG_TOKEN) protected permissionsConfig: IRestProviderOptions<Permission>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      permissionsConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl + '/groups/' + this.group.id,
        autoload: !!this.group.id,
        ...this.permissionsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return (
            action !== ProviderActionEnum.Create &&
            action !== ProviderActionEnum.Delete
          );
        }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        autoload: true,
        ...this.permissionsConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return (
            action !== ProviderActionEnum.Create &&
            action !== ProviderActionEnum.Delete
          );
        }
      });
    }
  }
  createDeleteModal(item: Permission): BsModalRef {
    return this.modalService.show(PermissionModalComponent, {
      class: 'modal-md',
      initialState: {
        title: translate('Delete permission'),
        message: translate(
          'Do you really want to delete permission "{{title}}" from group?'
        ),
        yesTitle: translate('Delete'),
        data: item,
        apiUrl: this.apiUrl
      }
    });
  }
  createAppendFromGridModal(): BsModalRef {
    return this.modalService.show(PermissionsGridModalComponent, {
      class: 'modal-md',
      initialState: {
        title: translate('Select permissions for append to group'),
        yesTitle: translate('Append'),
        apiUrl: this.apiUrl
      }
    });
  }
}