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
  constructor(private auth:AuthService) { 
    this.userData = this.auth.userData.user;
  }

  ngOnInit() {
   this.post.likes_by.forEach(elem=>{
     if(elem.user_id == this.userData.user_id){
       this.buttonValue = "Unlike";
     }
   })

  }

}
