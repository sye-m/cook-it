import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user_id: String;
  user;
  followValue: String = "Follow";
  colorValue = "primary";
  isLoading: boolean = false;
  post_pic;
  sub;
  sub2;
  isUsersProfile: boolean = false;
  posts: Array<Object> = [];
  savedPosts = [];
  
  constructor(private chatService: ChatService, private auth: AuthService, private userService: UserService, private postService: PostService, private route: ActivatedRoute, private router: Router) {
    this.user_id = this.route.snapshot.paramMap.get('user_id');
    this.user = this.auth.userData.user;

  }

  async ngOnInit() {
    if (this.auth.userData.user.user_id == this.user_id) {
      this.user = this.auth.userData.user;
      this.isUsersProfile = true;
    }
    await this.postService.getUsersPost(this.user_id).toPromise().then((data: any) => {
      this.posts = data.userPosts;
      if (this.isUsersProfile == false) {
        this.user = data.userData;
      }
      if (this.isUsersProfile == true) {
        this.savedPosts = data.savedPosts;
      }
    })
    this.auth.userData.user.following.forEach(elem => {
      if (elem.user_id == this.user.user_id) {
        this.followValue = "Following"
      }
    })

    this.auth.userData.user.followers.forEach(elem => {
      if (elem.user_id == this.user.user_id) {
        if (this.followValue != "Following")
          this.followValue = "Follow Back"
      }
    })
    if (this.followValue == "Follow" || this.followValue == "Follow Back") {
      this.colorValue = "primary";
    }
    else {
      this.colorValue = "warn"
    }

  }
  async followOrUnfollow(user) {
    this.isLoading = true;
    var button = document.getElementById('follow-button');
    button.setAttribute("disabled", "disabled");

    if (this.followValue == "Follow" || this.followValue == "Follow Back") {

      this.followValue = "Following";
      this.sub = this.userService.follow(user, this.auth.userData).subscribe((data: any) => { this.isLoading = false; });
      this.auth.userData.user.following.push({ user_id: user.user_id });
      button.removeAttribute("disabled");

    }
    else if (this.followValue == "Following") {

      this.followValue = "Follow";
      this.sub2 = this.userService.unfollow(user, this.auth.userData).subscribe((data: any) => { this.isLoading = false; });
      this.auth.userData.user.following = this.auth.userData.user.following.filter((val) => {
        if (val.user_id != user.user_id) {
          return true
        }
      })
      button.removeAttribute("disabled");

    }
    if (this.followValue == "Follow" || this.followValue == "Follow Back") {
      this.colorValue = "primary";
    }
    else {
      this.colorValue = "warn"
    }
  }

  async establishChat() {
    await this.userService.establishChat(this.auth.userData.user.user_id, this.user_id).toPromise().then((data: any) => {
      this.router.navigate(['/home/m', this.user_id]);
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }


}
