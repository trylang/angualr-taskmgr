// shared 模块用于将共享的模块导入再导出，如此，共享的模块只需加载shared一个木块即可。

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatButtonModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
  ],
  declarations: []
})
export class SharedModule { }
