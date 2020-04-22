import { PostService } from './../services/post.service';
import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit,OnDestroy {
  users:Array<Object>;
  user_ids=[];
  post_notif = [];
  post_notif_users=[];
  post_notif_user_ids=[];
  post_notif_post_ids=[];
  posts = [];
  sub;
  sub2;
  constructor(private auth:AuthService,private userService:UserService,private postService:PostService) {
   }


  async ngOnInit() {
    await this.auth.isLoggedIn().toPromise();
    //get followers activity user ids
  this.auth.userData.user.notifications.sort(
      function(a,b){
        // to get a value that is either negative, positive, or zero.
        //arrange the all messages array in ascending order
        if (b.date > a.date) return 1;
        if (b.date <a.date) return -1;
      })
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
      this.postService.getNotifPosts({'user_id':element.by_user_id,'post_id':element.acvtId}).toPromise().then((data:any)=>{this.post_notif_users.push(data)});
      }
    });
    this.sub = this.userService.getUsers(this.user_ids).subscribe((data:any)=> this.users = data.users);
    this.sub2 = this.userService.readAll(this.auth.userData.user).subscribe((data:any)=>{});
  }
  ngOnDestroy(){
    if(this.sub || this.sub2){
      this.sub.unsubscribe();
      this.sub2.unsubscribe();
    }
  }
}
