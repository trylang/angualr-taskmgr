import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDel = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
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
