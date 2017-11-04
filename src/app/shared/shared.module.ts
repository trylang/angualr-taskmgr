// shared 模块用于将共享的模块导入再导出，如此，共享的模块只需加载shared一个木块即可。

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatSelectModule, MatRadioModule, MatNativeDateModule, MatDatepickerModule, 
  MatTooltipModule, MatCheckboxModule,  MatMenuModule, MatAutocompleteModule, MatDialogModule, 
  MatTabsModule, MatGridListModule, MatSlideToggleModule, MatIconModule, MatButtonModule, MatCardModule, 
  MatListModule, MatInputModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
  ],
  declarations: [ConfirmDialogComponent,],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
