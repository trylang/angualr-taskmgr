import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from "../copy-task/copy-task.component";
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
  
  lists = [{
    id: 1,
    name: '代办',
    tasks: [{
      id: 1,
      completed: false,
      priority: 3,
      desc: '任务一： 去星巴克买杯咖啡',
      owner: {
        id: 1,
        name: '章三',
        avatar: 'avatars:svg-11'
      },
      dueDate: new Date()
    }, {
      id: 2,
      completed: true,
      priority: 1,
      desc: '任务二： 完成老板布置的泡泡糖作业',
      owner: {
        id: 1,
        name: '里斯',
        avatar: 'avatars:svg-12'
      },
      dueDate: new Date(),
      reminder: new Date()
    }, {
      id: 3,
      completed: false,
      priority: 2,
      desc: '任务三： 学习学习呀哈哈哈哈哈',
      owner: {
        id: 1,
        name: '朗朗',
        avatar: 'avatars:svg-11'
      },
      dueDate: new Date(),
      reminder: new Date()
    }]
  }, {
    id: 2,
    name: '进行中',
    tasks: [{
      id: 1,
      completed: false,
      priority: 3,
      desc: '任务一： 去星巴克发染发染发买杯咖啡',
      owner: {
        id: 1,
        name: '章三33',
        avatar: 'avatars:svg-11'
      },
      dueDate: new Date()
    }, {
      id: 2,
      completed: false,
      priority: 2,
      desc: '任务二： 完成老发染发染发染发板布置的泡泡糖作业',
      owner: {
        id: 1,
        name: '里斯2121',
        avatar: 'avatars:svg-12'
      },
      dueDate: new Date()
    }, {
      id: 3,
      completed: true,
      priority: 1,
      desc: '任务三： 好好学习学习呀哈哈哈哈哈',
      owner: {
        id: 1,
        name: '朗朗朗朗',
        avatar: 'avatars:svg-11'
      },
      dueDate: new Date()
    }]
  }]

  constructor(private dialog: MatDialog ) { }

  ngOnInit() {
  }

  lauchNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }

  lauchCopyTaskDialog(){
    this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  lauchUpdateTaskDialog(task){
    this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task}});
  }

  luachConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务', content:'确认要删除此任务么', confirmAction: '确认'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  luachNewTaskList() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '修改列表名称'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));    
  }

  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新增列表名称'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));    
  }

}
