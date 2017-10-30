import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { CoreModule }from './core/core.module';

import { AppRoutingModule } from './app.routing.module';
import { ProjectModule } from './project/project.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    CoreModule,
    AppRoutingModule,
    LoginModule,
    ProjectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
