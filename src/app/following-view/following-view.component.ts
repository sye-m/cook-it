import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-following-view',
  templateUrl: './following-view.component.html',
  styleUrls: ['./following-view.component.css']
})
export class FollowingViewComponent implements OnInit {
  users;
  user_ids=[];
  constructor(private auth:AuthService,private userService:UserService) { 
    this.auth.userData.user.following.forEach(element => {
      this.user_ids.push(element.user_id);
    });
  }

  ngOnInit() {
    this.userService.getUsers(this.user_ids).subscribe(data=>{this.users = data.users});
  }

}
