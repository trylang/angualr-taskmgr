import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';  //shared模块已经在根app模块已加载。
import {MatToolbarModule, MatIconModule, MatButtonModule} from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ // 申明组件，但只在此模块中可用，如果想让其他模块也可使用，则需要到处export
    HeaderComponent, FooterComponent, SidebarComponent
  ],
  exports: [ // 导出组件供其他模块使用
    HeaderComponent, FooterComponent, SidebarComponent
  ]
})
export class CoreModule {
  // module是一个类，自然就会有构造函数，也就可以进行依赖性注入。核心模块只想让其加载一次，如何做？
  // @Optional 意即coreModule是可选的, @SkipSelf 是从父级去寻找这个核心模块，避免无限循环。
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载！');
    }
  }
}
