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
  constructor(private auth:AuthService,private user:UserService) {
  this.users = this.auth.userData.user.notifications;
   }

  ngOnInit() {
    this.user.readAll(this.auth.userData.user).subscribe(data=>console.log(data));
  }

}
