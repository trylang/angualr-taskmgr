import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
  ],
  exports: [
    ProjectListComponent
  ],
  entryComponents: [NewProjectComponent, InviteComponent],  
  declarations: [ProjectListComponent, ProjectItemComponent, NewProjectComponent, InviteComponent]
})
export class ProjectModule { }
