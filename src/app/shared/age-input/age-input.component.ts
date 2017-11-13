import { Component, OnInit, Input, forwardRef } from '@angular/core';
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
import 'rxjs/add/observable/combineLatest.js';
import 'rxjs/add/observable/merge.js';
import 'rxjs/add/operator/filter.js';
import 'rxjs/add/operator/startWith.js';
import 'rxjs/add/operator/debounceTime.js';
import 'rxjs/add/operator/distinctUntilChanged.js';

import { isValidDate } from '../../utills/date.utill';

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
export class AgeInputComponent implements ControlValueAccessor {
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
        return {data: d, from: 'birthday'};
      })
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(300)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(300)
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
  }

  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {
  this.propagateChange = fn;
  }
  
  registerOnTouched(fn: any): void {}
  
  // 验证表单
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

  // 验证年龄
  validateAge(ageNumKey: string, ageUnitKey: string) {

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
