import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'modal-footer-buttons',
  templateUrl: './modal-footer-buttons.component.html',
  styleUrls: ['./modal-footer-buttons.component.scss']
})

export class ModalFooterButtonsComponent implements OnInit {

  @Input()
  public cancelTitle?: string;
  @Input()
  public okTitle?: string;
  @Input()
  public readonly: boolean;
  @Output()
  public onClose: EventEmitter<boolean | any> = new EventEmitter();

  constructor(public translateService: TranslateService) {
    if (this.cancelTitle === undefined) {
      this.cancelTitle = this.translateService.instant('Cancel');
    }
  }
  ngOnInit() { }

  close() {
    this.onClose.emit(true);
    return false;
  }
}
