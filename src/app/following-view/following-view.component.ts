import { ActivatedRoute } from '@angular/router';
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
  sub;
  user_id;
  following;
  constructor(private auth:AuthService,private userService:UserService,private route:ActivatedRoute) { 
    this.user_id = this.route.snapshot.paramMap.get('user_id');

  }

  async ngOnInit() {
    if(this.user_id == this.auth.userData.user.user_id){
      this.auth.userData.user.following.forEach(element => {
        this.user_ids.push(element.user_id);
      });
    }

    else{
      await this.userService.getUsers(this.user_id).toPromise().then(data=>{
        this.following = data.users[0].following;
      })
      this.following.forEach(element =>{
        this.user_ids.push(element.user_id);
      })
    }
    this.sub = this.userService.getUsers(this.user_ids).subscribe(data=>this.users = data.users);
  }

  
  
}
