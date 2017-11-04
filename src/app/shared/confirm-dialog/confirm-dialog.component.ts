import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h1 mat-dialog-title>{{dialog.title}}</h1>
  <div mat-dialog-content>{{dialog.content}}</div>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" (click)="handleAction(true)">{{dialog.confirmAction}}</button>
    <button mat-raised-button mat-dialog-close type="button" (click)="handleAction(false)">关闭</button>
  </div>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {
  dialog = {
    title: '',
    content: '',
    confirmAction: ''
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
    this.dialog = {
      title: this.data.title,
      content: this.data.content,
      confirmAction: this.data.confirmAction
    }
  }

  handleAction(result: boolean) {
    this.dialogRef.close(result);
  }

}
