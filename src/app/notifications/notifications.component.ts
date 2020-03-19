import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  users:Array<Object>;
  user_ids=[];
  constructor(private auth:AuthService,private userService:UserService) {
  this.auth.userData.user.notifications.forEach(element => {
    this.user_ids.push(element.user_id)
  });
  this.userService.getUsers(this.user_ids).subscribe(data=> this.users = data.users);
   }


  ngOnInit() {
  this.userService.readAll(this.auth.userData.user).subscribe(data=>console.log(data));
  }

}
