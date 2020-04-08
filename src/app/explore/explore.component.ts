import { AuthService } from './../services/auth.service';
import { PostService } from './../services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit,OnDestroy {
  posts:Array<Object>;
  sub;
  constructor(private post:PostService,private auth:AuthService) { }

  ngOnInit() {
    this.sub = this.post.explore(this.auth.userData.user).subscribe(data=>{this.posts = data.result});
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
