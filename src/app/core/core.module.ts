import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DomSanitizer } from '@angular/platform-browser'; // 用于返回安全的URL地址。
import { MatIconRegistry } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { loadSvgResources } from '../utills/svg.utill';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
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
  constructor(@Optional() @SkipSelf() parent: CoreModule,
  ir: MatIconRegistry,
  ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载！');
    } else {
      loadSvgResources(ir, ds);
    }
  }
}
