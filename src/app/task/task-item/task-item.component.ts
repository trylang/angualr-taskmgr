import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { itemAnim } from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ]
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter<void>();
  widthPriority = 'out';

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.widthPriority = 'in';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.widthPriority = 'out';
  }


  onItemClick() {
    this.taskClick.emit();
  }

  onCheckBoxClick(event: Event){
    event.stopPropagation();
  }

}
