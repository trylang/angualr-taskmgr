import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; // 用于返回安全的URL地址。
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Output() toggle = new EventEmitter<void>();
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'book',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/open-book-1.svg')
    );
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }

}
