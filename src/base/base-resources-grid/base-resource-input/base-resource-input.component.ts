import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EndpointStatusEnum } from '@rucken/core';

import { BaseComponent } from './../../../base/base-component/base-component.component';


@Component({
  selector: 'base-resource-input',
  template: ''
})
export class BaseResourceInputComponent extends BaseComponent {

  @Input()
  lookupTooltip?: string;
  @Input()
  lookupIcon?= 'fa fa-search';
  @Input()
  readonly = false;
  @Input()
  hardReadonly = false;
  @Input()
  inputReadonly = true;
  @Input()
  name = 'base-resource';
  @Input()
  placeholder = '';
  @Input()
  title = '';
  @Input()
  model: any = {};
  @Output()
  modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  modelAsString = '';
  @Output()
  modelAsStringChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  loadAll = false;

  items: any[];
  cachedResourcesService: any;

  get value() {
    return this.model;
  }
  set value(val) {
    this.model = val;
    this.modelChange.emit(this.model);
  }
  get valueAsString() {
    return this.modelAsString;
  }
  set valueAsString(val) {
    this.modelAsString = val;
    this.modelAsStringChange.emit(this.modelAsString);
  }
  get statusListMessage() {
    if (this.cachedResourcesService.statusList === EndpointStatusEnum.Ok) {
      return '';
    } else {
      return this.cachedResourcesService.statusListMessage;
    }
  }

  constructor(
    public translateService: TranslateService
  ) {
    super();
    translateService.onLangChange.subscribe(() => this.init());
  }
  init() {
    super.init();
    if (this.lookupTooltip === undefined) {
      this.lookupTooltip = this.translateService.instant('Select');
    }
    if (this.select && this.loadAll) {
      this.search();
    }
  }
  search() {
    const filter: any = {};
    this.cachedResourcesService.loadAll('', filter);
  }
}
