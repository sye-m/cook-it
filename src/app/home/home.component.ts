import { HomeFeedPostsComponent } from './../home-feed-posts/home-feed-posts.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  openSidenav:boolean =false;
  searchTerm:FormControl;
  userData;
  posts:Array<Object>;
  notifications=0;
  constructor(private userService:UserService,private auth:AuthService,private post:PostService,private router:Router) { 
    this.userData = this.auth.userData;
    this.userData.user.notifications.forEach(elem=>{
      if(elem.read == false){
        this.notifications= this.notifications+1;
      }
    })

}

  
  ngOnInit() {
    this.searchTerm = new FormControl('');
    this.router.navigate(['/home']);

  }

  search(){
    if(this.searchTerm.value!=''){
    this.router.navigate(['/home/search',this.searchTerm.value]);
    }
  }

   async logout(){
     await this.auth.logout().toPromise().then((data:any)=>{});
    this.router.navigate(['/user']);
  }
  
  ngOnDestroy(){
  }
}

