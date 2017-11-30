import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DomSanitizer } from '@angular/platform-browser'; // 用于返回安全的URL地址。
import { MatIconRegistry } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { ServicesModule } from '../services/services.module';
import { AppStoreModule } from '../reducers';

import { loadSvgResources } from '../utills/svg.utill';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import 'hammerjs';
import '../utills/debug.utill';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    ServicesModule,
    BrowserAnimationsModule,
    AppStoreModule,
  ],
  declarations: [ // 申明组件，但只在此模块中可用，如果想让其他模块也可使用，则需要到处export
    HeaderComponent, FooterComponent, SidebarComponent
  ],
  exports: [ // 导出组件供其他模块使用
    HeaderComponent, FooterComponent, SidebarComponent
  ],
  providers: [{
    provide: 'BASE_CONFIG', useValue: {
      uri: 'http://localhost:3000'
    }
  }]
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
