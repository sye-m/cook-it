import { AuthService } from './../services/auth.service';
import { PostService } from './../services/post.service';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-feed-posts',
  templateUrl: './home-feed-posts.component.html',
  styleUrls: ['./home-feed-posts.component.css']
})
export class HomeFeedPostsComponent implements OnInit {
posts; 
postSub;
  constructor(private post:PostService,private auth:AuthService,private ref:ChangeDetectorRef,private router:Router) {
    
   }

  async ngOnInit() {
  await this.post.homeFeed(this.auth.userData.user).toPromise().then(data=>{this.posts = data.result;});
  }
  
  


}
