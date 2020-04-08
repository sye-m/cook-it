import { ActivatedRoute } from '@angular/router';
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
  sub;
  user_id;
  followers=[];
  constructor(private auth:AuthService, private userService:UserService,private route:ActivatedRoute) { 
    this.user_id = this.route.snapshot.paramMap.get('user_id');
    
  }

  async ngOnInit() {
    if(this.user_id == this.auth.userData.user.user_id){
      this.auth.userData.user.followers.forEach(element => {
        this.user_ids.push(element.user_id);
      });
    }
    else{
      await this.userService.getUsers(this.user_id).toPromise().then(data=>{
        this.followers = data.users[0].followers;
      })
      this.followers.forEach(element =>{
        this.user_ids.push(element.user_id);
      })
    }
    this.sub = this.userService.getUsers(this.user_ids).subscribe(data=>this.users = data.users);
  }

}
