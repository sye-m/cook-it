import { AuthService } from './../services/auth.service';
import { PostService } from './../services/post.service';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-feed-posts',
  templateUrl: './home-feed-posts.component.html',
  styleUrls: ['./home-feed-posts.component.css']
})
export class HomeFeedPostsComponent implements OnInit {
  posts;
  postSub;
  users = [];
  userData;

  constructor(private userService: UserService, private post: PostService, private auth: AuthService, private ref: ChangeDetectorRef, private router: Router) {
    this.userData = this.auth.userData.user;
  }

  async ngOnInit() {
    await this.post.homeFeed(this.auth.userData.user).toPromise().then((data: any) => { this.posts = data.result; });
    await this.userService.recommendedUsers(this.userData.user_id, this.userData.following).toPromise().then((data: any) => this.users = data.users);
  }
}
