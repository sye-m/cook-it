import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { PostService } from './../services/post.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input('post')post;
  byUser={
    user_id:'',
    user_name:'',
    profile_pic:''
  };
  constructor(private userService:UserService) {}   

  ngOnInit() {
    this.userService.getUsers(this.post.by.user_id).toPromise().then((data:any)=>{this.byUser = data.users[0];});
  }

  
  

}
