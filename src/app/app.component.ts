import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dark = false;

  toggleDarkTheme(dark) {
    this.dark = dark;
  }
}
