import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  headerTitle = '';
  coverImages = [];
  projectForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder
    ) { 
  }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    if(this.data.project) {
      this.projectForm = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.headerTitle = '修改项目：';
    } else {
      this.projectForm = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: []
      });
      this.headerTitle = '创建项目：';
    }
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      this.dialogRef.close(value);
    }
  }

}
