import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';
import { TaskListService } from './task-list-service';
import { TaskService } from './task.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    QuoteService,
    ProjectService,
    TaskListService,
    TaskService
  ]
})
export class ServicesModule { }
