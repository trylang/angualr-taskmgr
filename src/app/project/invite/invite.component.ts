import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  items = [{
    id: 1,
    name: '哈哈'
  }, {
    id: 2,
    name: '章三'
  }, {
    id: 3,
    name: '只能告诉你'
  }]

  displayUser(user: {id: string; name: string}) {
    return user ? user.name : ''; 
  }

  constructor() { }

  ngOnInit() {
  }

}
