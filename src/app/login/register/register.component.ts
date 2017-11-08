import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../domain/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  User: FormGroup;

  public user: User = {
    email: null,
    name: null,
    password: null,
    avatar: null,
    dateOfBirth: null
  };
  items: string[];
  private readonly avatarName = 'avatars';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    this.User = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: []
    })
  }

  onSubmit({value, valid}, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }

}
