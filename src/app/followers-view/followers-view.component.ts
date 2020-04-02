import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-followers-view',
  templateUrl: './followers-view.component.html',
  styleUrls: ['./followers-view.component.css']
})
export class FollowersViewComponent implements OnInit {
  users;
  user_ids=[];
  constructor(private auth:AuthService,private userService:UserService) { 
    this.auth.userData.user.followers.forEach(element => {
      this.user_ids.push(element.user_id);
    });
  }

  ngOnInit() {
    this.userService.getUsers(this.user_ids).subscribe(data=>this.users = data.users);
}
}
