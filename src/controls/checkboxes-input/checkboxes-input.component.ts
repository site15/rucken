import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'checkboxes-input',
  templateUrl: './checkboxes-input.component.html',
  styleUrls: ['./checkboxes-input.component.scss']
})

export class CheckboxesInputComponent implements OnInit {
  @Input()
  labelClass? = 'control-label';
  @Input()
  inputClass? = 'control-label checkbox-inline';
  @Input()
  inputFrameClass? = 'form-control form-checkbox-controls';

  @ViewChild('inputElement')
  public inputElement: ElementRef;
  @Input()
  public focused = false;
  @Input()
  public readonly = false;
  @Input()
  public name = 'checkboxes';
  @Input()
  public title = '';
  @Input()
  public models: { [key: string]: boolean; } = {};
  @Input()
  public checkboxesTitles: { [key: string]: string; } = {};
  @Output()
  public modelsChange: EventEmitter<{ [key: string]: boolean; }> = new EventEmitter<{ [key: string]: boolean; }>();

  public values: { [key: string]: boolean; } = {};
  @Input()
  public errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public info: EventEmitter<any> = new EventEmitter<any>();
  public errorsValue: any;
  public infoValue: any;
  ngOnInit() {
    this.errors.subscribe((data: any) => {
      this.errorsValue = data;
      const keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
    });
    this.info.subscribe((data: any) => {
      this.infoValue = data;
      const keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
    });
    this.init();
  }
  init() {
    this.values = this.models;
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 700);
  }
  focus() {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }
  updateModels() {
    setTimeout((out: any) => {
      this.models = this.values;
      this.modelsChange.emit(this.models);
    }, 700);
  }
  keys(object: {}) {
    return Object.keys(object);
  }
}
