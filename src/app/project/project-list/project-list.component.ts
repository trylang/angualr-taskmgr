import { Component, OnInit, Input, HostBinding, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ProjectService } from '../../services/project.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService
  ) { }

  ngOnInit() {
    this.service$.get("1").subscribe(projects => this.projects = projects);
    this.cd.markForCheck(); // 用于增强检测projects
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef =  this.dialog.open(
      NewProjectComponent, 
      {data: {
        thumbnails: this.getThumbnails(),
        img: selectedImg
        }
      });
    dialogRef.afterClosed().filter(n => n).subscribe(result => {
      this.service$.add(result);
    });
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

  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }

}
