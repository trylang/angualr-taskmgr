import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dark = false;

  toggleDarkTheme(dark) {
    this.dark = dark;
    this.oc.getContainerElement().classList.add(dark ? 'unicorn-dark-theme' : null);
    
  }
constructor(private oc: OverlayContainer) {}

}
