import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
@Input('user')user;
colorValue="primary"
userData;
buttonValue:String = "Follow";
  constructor(private auth:AuthService,private userService:UserService) {
    this.userData = this.auth.userData;
   }

  ngOnInit() {
    console.log(this.user)
    
     this.userData.user.following.forEach(elem => {
      if(elem.user_id == this.user.user_id){
        this.buttonValue="Following"
      }
    })
      
    
     
     this.userData.user.followers.forEach(elem => {
      if(elem.user_id == this.user.user_id){
        if(this.buttonValue !="Following")
        this.buttonValue="Follow Back"
      }
     })
     if(this.buttonValue=="Follow" || this.buttonValue =="Follow Back"){
      this.colorValue="primary";
    }
    else{
      this.colorValue="warn"
    }
    
}
followOrUnfollow(){
if(this.buttonValue == "Follow" || this.buttonValue == "Follow Back"){
this.buttonValue = "Following";
this.userService.follow(this.user,this.userData).subscribe(data=>console.log(data));
var followUser = {
  user_id:this.user.user_id,
}
console.log(followUser);
this.auth.userData.user.following.push(followUser);

}
else if(this.buttonValue == "Following"){
  this.buttonValue = "Follow";
this.userService.unfollow(this.user,this.userData).subscribe(data=>console.log(data));
this.auth.userData.user.following = this.auth.userData.user.following.filter((val)=>{
  if(val.user_id!=this.user.user_id){
    return true
  }
})
}
if(this.buttonValue=="Follow" || this.buttonValue=="Follow Back"){
  this.colorValue="primary";
}
else{
  this.colorValue="warn"
}

}
}
