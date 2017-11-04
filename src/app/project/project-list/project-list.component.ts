import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [{
    "name": "企业写作平台",
    "desc": "这是一个企业内部项目",
    "coverImg": "assets/img/covers/0.jpg"
  }, {
    "name": "企业写作平台2",
    "desc": "这是一个企业内部项目2",
    "coverImg": "/assets/img/covers/1.jpg"
  }];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef =  this.dialog.open(NewProjectComponent, {data: {title: '新建项目'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  launchInviteDialog() {
    const dialogRef =  this.dialog.open(InviteComponent, {data: {dark: true}});
  }

  lauchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目'}})
  }

  lauchCOnfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '您确认要删除此项目么？', confirmAction: '确认'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));    
  }

}
