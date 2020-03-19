import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user_id:String;
  user;
  followValue:String = "Follow";
  colorValue="primary";
  isLoading:boolean =false;
  post_pic;



  isUsersProfile:boolean = false;
  posts:Array<Object>=[];
  savedPosts=[];
  constructor(private auth:AuthService,private userService:UserService,private postServie:PostService,private route:ActivatedRoute) {
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

      this.auth.userData.user.following.forEach(elem => {
        if(elem.user_id == this.user.user_id){
          this.followValue="Following"
        }
      })
  
      this.auth.userData.user.followers.forEach(elem => {
        if(elem.user_id == this.user.user_id){
          if(this.followValue !="Following")
          this.followValue="Follow Back"
        }
      })
      if(this.followValue=="Follow" || this.followValue=="Follow Back"){
        this.colorValue="primary";
      }
      else{
        this.colorValue="warn"
      }

    });
  }
  async followOrUnfollow(user){
    this.isLoading = true;
    var button = document.getElementById('follow-button');
    button.setAttribute("disabled","disabled");

    if(this.followValue == "Follow" || this.followValue == "Follow Back"){
    
      this.followValue = "Following";
    this.userService.follow(user,this.auth.userData).subscribe(data=>{console.log(data);this.isLoading = false;});
     this.auth.userData.user.following.push({user_id:user.user_id});
    button.removeAttribute("disabled");
    
  }
    else if(this.followValue == "Following"){

      this.followValue = "Follow";
    this.userService.unfollow(user,this.auth.userData).subscribe(data=>{console.log(data);this.isLoading = false;});
    this.auth.userData.user.following =  this.auth.userData.user.following.filter((val)=>{
      if(val.user_id!=user.user_id){
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

    


}
