import {HomeFeedPostsComponent } from './../home-feed-posts/home-feed-posts.component';
import { Router,  } from '@angular/router';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-feed-posts-view',
  templateUrl: './home-feed-posts-view.component.html',
  styleUrls: ['./home-feed-posts-view.component.css']
})
export class HomeFeedPostsViewComponent implements OnInit,OnChanges {
  @Input('post')post;
  @Output() changed = new EventEmitter<Array<Object>>();

  followValue:String = "Follow";
  buttonValue:String = "Like";
  colorValue="primary";
  userData;
  saveValue:String="Save";
likes=0;
mySubscription;
  constructor(private homeFeed:HomeFeedPostsComponent,private auth:AuthService, private postService:PostService,private userService:UserService,private router:Router) {
    this.userData = this.auth.userData.user;
    
   }

   ngOnInit() {
     this.likes = this.post.likes_by.length;
    this.post.likes_by.forEach(elem=>{
      if(elem.user_id == this.userData.user_id){
        this.buttonValue = "Unlike";
      }
    })
    this.userData.following.forEach(elem => {
      if(elem.user_id == this.post.by.user_id){
        this.followValue="Following"
      }
    })

    this.userData.followers.forEach(elem => {
      if(elem.user_id == this.post.by.user_id){
        if(this.followValue !="Following")
        this.followValue="Follow Back"
      }
    })

    this.userData.saved.forEach(elem=>{
      if(elem.post_id == this.post.post_id){
        this.saveValue = "UnSave";
      }
    })

    if(this.followValue=="Follow"){
      this.colorValue="primary";
    }
    else{
      this.colorValue="warn"
    }

  }

  ngOnChanges(){
    this.ngOnInit();
  }
  async likeOrUnlike(){
  
    await this.postService.likeOrUnlike(this.post.post_id,this.userData,this.buttonValue).toPromise().then(result=>{
     console.log(result);
     });
     if(this.buttonValue == "Like"){
      this.buttonValue = "Unlike";
      this.likes = this.likes+1;
     }
     else {
       this.buttonValue = "Like"
       this.likes = this.likes-1;
     }
    }
  
    async saveOrUnSave(){
      await this.userService.saveOrUnSave(this.post.post_id,this.userData.user_id,this.saveValue).toPromise().then(result=>{
        console.log(result);
        });
        if(this.saveValue == "Save"){
         this.saveValue = "UnSave";
        }
        else {
          this.saveValue = "Save"
        }
    }
  
     followOrUnfollow(postObj){
      if(this.followValue == "Follow" || this.followValue == "Follow Back"){
      this.followValue = "Following";
       this.userService.follow(this.post.by,this.auth.userData).subscribe(data=>console.log(data));
      this.auth.userData.user.following.push(postObj);
      }
      else if(this.followValue == "Following"){
        this.followValue = "Follow";
      this.userService.unfollow(this.post.by,this.auth.userData).
      subscribe(data=>{
        console.log(data)
      });
      this.auth.userData.user.following = this.auth.userData.user.following.filter((val)=>{
        if(val.user_id!=postObj.user_id){
          return true
        }
      })
      console.log(this.auth.userData.user.following);
      this.homeFeed.posts = this.homeFeed.posts.filter(function(val){
        if(val.by.user_id!= postObj.user_id){
          return true;
        }
      })
      }

      }
      
  
}
