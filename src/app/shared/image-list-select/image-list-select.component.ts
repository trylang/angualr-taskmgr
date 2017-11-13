import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [{ // 将自己这个组件注入到这个NG_VALUE_ACCESSOR令牌上，
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImageListSelectComponent),
    multi: true
  }, { 
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => ImageListSelectComponent),
    multi: true
  }]
})
export class ImageListSelectComponent implements ControlValueAccessor {
 
  @Input() title = '选择';
  @Input() cols = 6;
  @Input() rowHeight = '64px';
  @Input() items: string[] = [];
  @Input() itemWidth = '80px';
  @Input() useSvgIcon = false;

  selected: string;
  constructor() { }

  private propagateChange = (_: any)  => {}; // 定义一个空函数用于接收变化值
  onChange(i) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }
  
  /**
   * Writes a new value to the element.
   *
   * This method will be called by the forms API to write to the view when programmatic
   * (model -> view) changes are requested.
   *
   * Example implementation of `writeValue`:
   *
   * ```ts
   * writeValue(value: any): void {
   *   this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
   * }
   * ```
   */
  writeValue(obj: any): void {
    this.selected = obj;
  }
  /**
   * Registers a callback function that should be called when the control's value
   * changes in the UI.
   *
   * This is called by the forms API on initialization so it can update the form
   * model when values propagate from the view (view -> model).
   *
   * If you are implementing `registerOnChange` in your own value accessor, you
   * will typically want to save the given function so your class can call it
   * at the appropriate time.
   *
   * ```ts
   * registerOnChange(fn: (_: any) => void): void {
   *   this._onChange = fn;
   * }
   * ```
   *
   * When the value changes in the UI, your class should call the registered
   * function to allow the forms API to update itself:
   *
   * ```ts
   * host: {
   *    (change): '_onChange($event.target.value)'
   * }
   * ```
   *
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  /**
   * Registers a callback function that should be called when the control receives
   * a blur event.
   *
   * This is called by the forms API on initialization so it can update the form model
   * on blur.
   *
   * If you are implementing `registerOnTouched` in your own value accessor, you
   * will typically want to save the given function so your class can call it
   * when the control should be considered blurred (a.k.a. "touched").
   *
   * ```ts
   * registerOnTouched(fn: any): void {
   *   this._onTouched = fn;
   * }
   * ```
   *
   * On blur (or equivalent), your class should call the registered function to allow
   * the forms API to update itself:
   *
   * ```ts
   * host: {
   *    '(blur)': '_onTouched()'
   * }
   * ```
   */
  registerOnTouched(fn: any): void {}

  // 表单验证，如果选择就为null，否则返回验证信息
  validate(c: FormControl): {[key: string]: any} {
    return this.selected? null : {
      imageListInvalid: {
        valid: false
      }
    }
  }

}
