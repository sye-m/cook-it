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
  constructor(private auth:AuthService) {
  this.users = this.auth.userData.user.notifications;
  console.log(this.users)
   }

  ngOnInit() {
    
  }

}
