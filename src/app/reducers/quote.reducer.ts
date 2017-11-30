import * as quoteAction from '../actions/quote.action';
import { Quote } from '../domain/quote.model';

export interface State {
  quote: Quote; 
};

export const initialState: State = {
  quote: {
    "id": "2",
    "cn": "不要只因一次挫败，就放弃你原来决心想达到的梦想。（莎士比亚）",
    "en": "Do not, for one repulse, forgo the purpose that you resolved to effect.",
    "pic": "/assets/img/quotes/2.jpg"
  }
};

export function reducer(state = initialState, action: {type: string, payload: any} ): State {
  switch (action.type) {
    case quoteAction.QUOTE_SUCCESS: {
      return { ...state, quote: action.payload};
    }

    case quoteAction.QUOTE_FAIL:
    default: {
      return state;
    }
  }
}