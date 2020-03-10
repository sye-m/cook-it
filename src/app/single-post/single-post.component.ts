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
buttonValue:String = "Like";
userData;
  constructor(private auth:AuthService, private postService:PostService) { 
    this.userData = this.auth.userData.user;
  }

  ngOnInit() {
   this.post.likes_by.forEach(elem=>{
     if(elem.user_id == this.userData.user_id){
       this.buttonValue = "Unlike";
     }
   })
  }

   likeOrUnlike(){
     if(this.buttonValue == "Like"){
      this.buttonValue = "Unlike";
     }
     else {
       this.buttonValue = "Like"
     }
    this.postService.likeOrUnlike(this.post.post_id,this.userData,this.buttonValue).subscribe(result=>{
    console.log(result);
    });
   }
  
  

}
