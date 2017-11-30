import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  quote$: Observable<Quote>;
  constructor(
    private quoteService$: QuoteService,
    private store$: Store<fromRoot.State>
  ) {
    this.quote$ = this.store$.select(state => state.quote.quote);
    this.quoteService$
      .getQuote()
      .subscribe(
        q => {
          this.store$.dispatch({type: actions.QUOTE_SUCCESS, payload: q})
        }
        // q => this.quote = q
      );
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('lang@163.com', Validators.compose([Validators.required, Validators.email, this.validata])),
      password: new FormControl('123456', Validators.required)
    })
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
  }

  // 自定义检验器
  validata(c: FormControl): {[key: string]: any} {
    if (!c.value) {
      return null;  // 返回null就是正确的结果
    }
    const pattern = /^lang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with lang'
    }
  }

}
