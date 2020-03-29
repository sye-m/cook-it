import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  userData;
  following_ids=[];
  constructor(private auth:AuthService,private userService:UserService) { 
    this.userData = this.auth.userData.user;
   
  }

  ngOnInit() {
    this.userData.following.forEach(elem=>{
      this.following_ids.push(elem.user_id);
    })
    this.userService.getUsers(this.following_ids).subscribe(data=> console.log(data));
  }

}
