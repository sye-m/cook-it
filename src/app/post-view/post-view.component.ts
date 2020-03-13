import { ActivatedRoute } from '@angular/router';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
post_id:String;
post;
followValue:String = "Follow";
colorValue="primary";
buttonValue:String = "Like";
userData;
saveValue:String="Save";
  constructor(private auth:AuthService, private postService:PostService,private userService:UserService,private route:ActivatedRoute) { 
    this.post_id = this.route.snapshot.paramMap.get('post_id');
    this.userData = this.auth.userData.user;
   
  }

  async ngOnInit() {
   
   await this.postService.singlePost(this.post_id).toPromise().then(data=>this.post =data.post[0]);
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

  
  async likeOrUnlike(){
  
  await this.postService.likeOrUnlike(this.post.post_id,this.userData,this.buttonValue).toPromise().then(result=>{
   console.log(result);
   });
   if(this.buttonValue == "Like"){
    this.buttonValue = "Unlike";
   }
   else {
     this.buttonValue = "Like"
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
    console.log('test');
    this.auth.userData.user.following.push(postObj);
    
  }
    else if(this.followValue == "Following"){
      this.followValue = "Follow";
    this.userService.unfollow(this.post.by,this.auth.userData).subscribe(data=>console.log(data));
    console.log('test');
    this.auth.userData.user.following = this.auth.userData.user.following.filter((val)=>{
      if(val==postObj){
        return true
      }
    })

  }
  
    }
    

}
