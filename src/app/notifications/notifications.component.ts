import { PostService } from './../services/post.service';
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
  post_notif = [];
  post_notif_users=[];
  post_notif_user_ids=[];
  post_notif_post_ids=[];
  posts = [];

  constructor(private auth:AuthService,private userService:UserService,private postService:PostService) {
   }


  async ngOnInit() {
    await this.auth.isLoggedIn().toPromise();
    //get followers activity user ids
    this.auth.userData.user.notifications.forEach(element => {
      if(element.activityType == "Account Activity"){
      this.user_ids.push(element.by_user_id)
      }
    });
    //get post related activity user ids and post ids
    this.auth.userData.user.notifications.forEach(element => {
      if(element.activityType == "Post Activity"){
      this.post_notif.push(element)
      this.post_notif_user_ids.push(element.by_user_id)
      this.post_notif_post_ids.push(element.acvtId)
      this.postService.getNotifPosts({'user_id':element.by_user_id,'post_id':element.acvtId}).toPromise().then(data=>{console.log(data);this.post_notif_users.push(data)});
      }
    });
    this.userService.getUsers(this.user_ids).subscribe(data=> this.users = data.users);
    
  this.userService.readAll(this.auth.userData.user).subscribe(data=>{});
  }

}
