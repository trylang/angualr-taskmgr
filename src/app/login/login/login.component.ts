import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import{ QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  quote: Quote = {
    "id": "2",
    "cn": "不要只因一次挫败，就放弃你原来决心想达到的梦想。（莎士比亚）",
    "en": "Do not, for one repulse, forgo the purpose that you resolved to effect.",
    "pic": "/assets/img/quotes/2.jpg"
  };
  constructor(private quoteService$: QuoteService) {
    this.quoteService$.getQuote().subscribe(q => this.quote = q);
  }

  ngOnInit() {
  }

}
