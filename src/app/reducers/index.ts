import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';

import * as fromQuote from './quote.reducer';
import { environment } from '../../environments/environment.prod';

export interface State {
  quote: fromQuote.State
};

const initialState = {
  quote: fromQuote.initialState
};

// 建立一个reducer字典，用于扩充
const reducers = {
  quote: fromQuote.reducer
}

// 所有的reducer返回的都是state
const productionReducers: ActionReducer<State> = combineReducers(reducers);

// const developmentReducers: ActionReducer<State> = combineReducers(storeFreeze(reducer));
// compose 这个函数是ngrx提供的，与上面的写法含义相同，只是写法上更雅观。
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initialState, action: any ): State {
  return environment.production ?  productionReducers(state, action) : developmentReducers(state, action);
}

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ]
})
export class AppStoreModule {}