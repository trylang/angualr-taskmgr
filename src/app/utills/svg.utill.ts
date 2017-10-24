import { DomSanitizer } from '@angular/platform-browser'; // 用于返回安全的URL地址。
import {MatIconRegistry} from '@angular/material';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
    ir.addSvgIcon('book', ds.bypassSecurityTrustResourceUrl('assets/icons/open-book-1.svg'));
};