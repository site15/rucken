import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BaseModalComponent } from './../../base/base-modal/base-modal.component';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html'
})

export class AlertModalComponent extends BaseModalComponent {

  @ViewChild('focusElement')
  focusElement: ElementRef;
  @ViewChild('modal')
  modal: ModalDirective;

  @Input()
  name = 'alert';
  @Input()
  buttonClass = 'btn-default';
  @Input()
  buttonText: string;
  @Input()
  content?: string;
  @Input()
  messageClass = 'text-danger';
  @Output()
  onClose: EventEmitter<AlertModalComponent | any> = new EventEmitter<any>();
  init() {
    super.init();
    if (this.content === undefined) {
      this.content = '';
    }
  }
}
