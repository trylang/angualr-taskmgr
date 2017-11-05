import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item ',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDel = new EventEmitter<void>();

  @HostBinding('@card') cardState = 'out';
  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target) {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  openInviteDialog(event: Event) {
    this.onInvite.emit();
  }

  openUpdateDialog(event: Event){
    this.onEdit.emit();
  }

  openDeleteDialog(event: Event) {
    this.onDel.emit();
  }

}
