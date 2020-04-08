import { ActivatedRoute } from '@angular/router';
import { PostService } from './../services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit,OnDestroy {
  post_id:String;
  post;
  followValue:String = "Follow";
  colorValue="primary";
  buttonValue:String = "Like";
  userData;
  byUser={
    user_id:'',
    user_name:'',
    profile_pic:''
  };
  saveValue:String="Save";
  isLoading:boolean = false;
  sub;
  sub2;
  sub0;

  constructor(private auth:AuthService, private postService:PostService,private userService:UserService,private route:ActivatedRoute) { 
    this.post_id = this.route.snapshot.paramMap.get('post_id');
    this.userData = this.auth.userData.user;
  }

  async ngOnInit() {
    await this.postService.singlePost(this.post_id).toPromise().then(data=>this.post =data.post[0]);
    await this.userService.getUsers(this.post.by.user_id).toPromise().then(data=>this.byUser = data.users[0]);

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

    

    this.userData.saved.forEach(elem=>{
      if(elem.post_id == this.post.post_id){
        this.saveValue = "UnSave";
      }
    })

    if(this.followValue=="Follow" || this.followValue=="Follow Back"){
      this.colorValue="primary";
    }
    else{
      this.colorValue="warn"
    }
  }

  
  async likeOrUnlike(){
  await this.postService.likeOrUnlike(this.post.post_id,this.userData,this.buttonValue).toPromise().then(result=>{});
   if(this.buttonValue == "Like"){
    this.buttonValue = "Unlike";
   }
   else {
     this.buttonValue = "Like"
   }
  }

  async saveOrUnSave(){
    await this.userService.saveOrUnSave(this.post.post_id,this.userData.user_id,this.saveValue).toPromise().then(result=>{});
      if(this.saveValue == "Save"){
       this.saveValue = "UnSave";
       this.userData.saved.push({post_id:this.post.post_id});
      }
      else {
        this.saveValue = "Save";
        this.userData.saved = this.userData.saved.filter(elem =>{
          if(elem.post_id != this.post.post_id){
            return true;
          }
        })
      }
      
  }

  async followOrUnfollow(postObj){
    this.isLoading = true;
    var button = document.getElementById('follow-button');
    button.setAttribute("disabled","disabled");

    if(this.followValue == "Follow" || this.followValue == "Follow Back"){
      this.followValue = "Following";
      this.sub = this.userService.follow(this.post.by,this.auth.userData).subscribe(data=>{this.isLoading = false;});
      this.auth.userData.user.following.push(postObj);
      button.removeAttribute("disabled");
    }

    else if(this.followValue == "Following"){
      this.followValue = "Follow";
      this.sub0 = this.userService.unfollow(this.post.by,this.auth.userData).subscribe(data=>{this.isLoading = false;});
      this.auth.userData.user.following =  this.auth.userData.user.following.filter((val)=>{
      if(val.user_id!=postObj.user_id){
        return true
      }
    })
    button.removeAttribute("disabled");

    }
    if(this.followValue=="Follow" || this.followValue=="Follow Back"){
      this.colorValue="primary";
    }
    else{
      this.colorValue="warn"
    }
  }

  deletePost(postId){
    this.sub2 = this.postService.deletePost(postId,this.userData).subscribe((data)=>{});
  }

  ngOnDestroy(){
    if(this.sub0){
      this.sub0.unsubscribe();
    }
    if(this.sub){
        this.sub.unsubscribe();
    }
    if(this.sub2){
        this.sub2.unsubscribe();
    }
  }
}
