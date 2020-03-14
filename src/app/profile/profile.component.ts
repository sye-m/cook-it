import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user_id:String;
  user;
  isUsersProfile:boolean = false;
  posts:Array<Object>=[];
  savedPosts=[];
  constructor(private auth:AuthService,private postServie:PostService,private route:ActivatedRoute) {
    this.user_id = this.route.snapshot.paramMap.get('user_id');
    this.user = this.auth.userData.user;

   }

  ngOnInit() {
    if(this.auth.userData.user.user_id == this.user_id){
      this.user = this.auth.userData.user;
      this.isUsersProfile = true;
    }
    this.postServie.getUsersPost(this.user_id).subscribe((data)=>{
      this.posts = data.userPosts;
      if(this.isUsersProfile==false){
        this.user = data.userData;
      }
      if(this.isUsersProfile==true){
      this.savedPosts = data.savedPosts;
      }
    });
  }

}
