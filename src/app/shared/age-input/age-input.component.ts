import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse
} from 'date-fns';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest.js';
import 'rxjs/add/observable/merge.js';
import 'rxjs/add/operator/filter.js';
import 'rxjs/add/operator/startWith.js';
import 'rxjs/add/operator/debounceTime.js';
import 'rxjs/add/operator/distinctUntilChanged.js';

import {toDate, isValidDate } from '../../utills/date.utill';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}
@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [{ // 将自己这个组件注入到这个NG_VALUE_ACCESSOR令牌上，
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AgeInputComponent),
    multi: true
  }, { 
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AgeInputComponent),
    multi: true
  }]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  selectedUnit = AgeUnit.Year;
  ageForm: FormGroup;
  ageUnits = [{
    value: AgeUnit.Year, label: '岁'   
  }, {
    value: AgeUnit.Month, label: '月'
  }, {
    value: AgeUnit.Day, label: '天'
  }];
  dateOfBirth;

  @Input() daysTop = 90;
  @Input() monthsTop = 24;
  @Input() yearsTop = 150;
  @Input() daysBottom = 0;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() debounceTime = 300;

  private subBirth: Subscription;
  private propagateChange = (_: any)  => {}; // 定义一个空函数用于接收变化值
  
  constructor(
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.ageForm = this.fb.group({
      birthday: [this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: []
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
    const birthday = this.ageForm.get('birthday');
    const ageNum = this.ageForm.get('age').get('ageNum');
    const ageUnit = this.ageForm.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
      .map(d => {
        return {date: d, from: 'birthday'};
      })
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();

    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_n, _u) => {
        return this.toDate({age: _n, unit: _u});
      })
      .map(d => {
        return {date: d, from: 'age'};
      })
      .filter(_ => this.ageForm.get('age').valid);
    const merged$ = Observable
      .merge(birthday$, age$)
      .filter(_ => this.ageForm.valid);
    this.subBirth = merged$.subscribe(date => {
      const age = this.toAge(date.date);
      if (date.from === 'birthday') {
        if (age.age === ageNum.value && age.unit === ageUnit.value) {
          return;
        }
        ageUnit.patchValue(age.unit, {emitEvent: false, emiModeToViewChange: true, emitViewToModelChange: true});
        ageNum.patchValue(age.age, {emitEvent: false});
        this.selectedUnit = age.unit;
        this.propagateChange(date.date);
      } else {
        const ageToCompare = this.toAge(this.ageForm.get('birthday').value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          // patchValue 为更新表单数据，emitEvent为数据更新，是否发射此事件
          this.ageForm.get('birthday').patchValue(date.date, {emitEvent: false});
          this.propagateChange(date.date);
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }

  // 提供值的写入方法
  writeValue(obj: any): void {
    if (obj) {
      const date = toDate(obj);
      this.ageForm.get('birthday').patchValue(date, {emitEvent: true});
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  registerOnChange(fn: any): void {
  this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  registerOnTouched(fn: any): void {}
  
  // 验证表单,验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      ageInvalid: true
    }
  }

  // 验证时间
  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    }
  }

  // 验证年龄(返回一个函数)
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;

      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop;
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result ? null : {
        ageInvalid: true
      }
    }
  }

  private toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = new Date();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Month
      }
    } else {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Year
      }
    }

  }
  

  private toDate(age: Age): string {
   const now = new Date();
   switch (age.unit) {
     case AgeUnit.Year: {
       return toDate(subYears(now, age.age));
     }
     case AgeUnit.Month: {
       return toDate(subMonths(now, age.age));
     }
     case AgeUnit.Day: {
       return toDate(subDays(now, age.age));
     }
     default: {
       return this.dateOfBirth;
     }
   }
  }
}
