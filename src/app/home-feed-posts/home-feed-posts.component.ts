import { AuthService } from './../services/auth.service';
import { PostService } from './../services/post.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-feed-posts',
  templateUrl: './home-feed-posts.component.html',
  styleUrls: ['./home-feed-posts.component.css']
})
export class HomeFeedPostsComponent implements OnInit {
  posts:Array<Object>;
  
  constructor(private post:PostService,private auth:AuthService) {
    
   }

  ngOnInit() {
    this.post.homeFeed(this.auth.userData.user).subscribe(data=>{console.log(data);this.posts = data.result});

  }

}
