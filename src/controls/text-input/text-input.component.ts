import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { TextInputConfig } from './text-input.config';
import emailMask from 'text-mask-addons/dist/emailMask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})

export class TextInputComponent implements OnInit {
  @Input()
  labelClass? = 'control-label';
  @Input()
  inputClass? = 'form-control';
  @Input()
  inputFrameClass? = '';

  @ViewChild('inputElement')
  public inputElement: ElementRef;
  @ViewChild('tooltip')
  public tooltip: TooltipDirective;
  @Input()
  public focused = false;
  @Input()
  public type = 'text';
  @Input()
  public readonly = false;
  @Input()
  public name = 'text';
  @Input()
  public placeholder = '';
  @Input()
  public title = '';
  @Input()
  public model = '';
  @Input()
  public hardValue: string = null;
  @Output()
  public modelChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public errors: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public info: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  public maxlength: number;
  @Input()
  public mask: any = { mask: false };
  @Input()
  public step: string;
  @Input()
  public min = '';
  @Input()
  public max = '';
  @Input()
  public tooltipEnable: boolean;
  @Input()
  public tooltipText = '';
  @Input()
  public tooltipPlacement = 'bottom';
  @Input()
  public tooltipTriggers = 'hover focus';

  public errorsValue: any;
  public infoValue: any;
  constructor(
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: TextInputConfig
  ) {
    if (this.tooltipEnable === undefined) {
      this.tooltipEnable = config.errorInTooltip;
    }
    if (this.maxlength === undefined) {
      this.maxlength = config.maxlength;
    }
    if (this.step === undefined) {
      this.step = config.step;
    }
  }
  ngOnInit() {
    this.errors.subscribe((data: any) => {
      this.errorsValue = data;
      const keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
      this.tooltipText = this.errorMessage;
    });
    this.info.subscribe((data: any) => {
      this.infoValue = data;
      const keys = Object.keys(data);
      if (keys[0] === this.name) {
        this.focus();
      }
      this.tooltipText = this.infoMessage;
    });
    this.init();
  }
  init() {
    if (this.mask.mask === false) {
      if (this.type === 'email') {
        this.type = 'text';
        this.mask.mask = emailMask;
      }
      if (this.type === 'currency') {
        const numberMask = createNumberMask(this.config.currencyMask);
        this.type = 'text';
        this.mask.mask = numberMask;
      }
      if (this.type === 'phone') {
        this.type = 'text';
        this.mask.mask = ['+', /\d/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      }
    }
    setTimeout((out: any) => {
      if (this.focused === true) {
        this.focus();
      }
    }, 700);
  }
  showTooltip() {
    const tooltip: any = this.tooltip;
    if (!tooltip._tooltip || !tooltip._tooltip._componentRef || !tooltip._tooltip._componentRef.location.nativeElement) {
      return;
    }
    const tooltipInner: any = tooltip._tooltip._componentRef.location.nativeElement.getElementsByClassName('tooltip-inner')[0];
    const tooltipArrow: any = tooltip._tooltip._componentRef.location.nativeElement.getElementsByClassName('tooltip-arrow')[0];
    tooltipInner.style.backgroundColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
    tooltipArrow.style.borderTopColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
    tooltipArrow.style.borderBottomColor = getComputedStyle(this.inputElement.nativeElement).borderColor;
  }
  safeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  get errorMessage(): any {
    const arr: string[] = [];
    let text = '';
    if (this.errorsValue && this.errorsValue[this.name]) {
      for (let i = 0; i < this.errorsValue[this.name].length; i++) {
        if (this.errorsValue[this.name][i]) {
          text = this.translateService.instant(this.errorsValue[this.name][i]);
          arr.push(text);
        }
      }
    }
    if (arr.length > 0) {
      return arr.join(', ');
    }
    return false;
  }
  get infoMessage(): any {
    const arr: string[] = [];
    let text = '';
    if (this.infoValue && this.infoValue[this.name]) {
      for (let i = 0; i < this.infoValue[this.name].length; i++) {
        if (this.infoValue[this.name][i]) {
          text = this.translateService.instant(this.infoValue[this.name][i]);
          arr.push(text);
        }
      }
    }
    if (arr.length > 0) {
      return arr.join(', ');
    }
    return false;
  }
  focus() {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }
  get value() {
    if (this.hardValue !== null) {
      return this.hardValue;
    }
    return this.model;
  }
  set value(val) {
    if (this.errorsValue && this.errorsValue[this.name]) {
      delete this.errorsValue[this.name];
      this.tooltipText = '';
    }
    this.model = val;
    this.modelChange.emit(this.model);
  }
}
