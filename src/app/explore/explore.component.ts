import { AuthService } from './../services/auth.service';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private post:PostService,private auth:AuthService) { }
posts:Array<Object>;
  ngOnInit() {
    this.post.explore(this.auth.userData.user).subscribe(data=>{console.log(data.result);this.posts = data.result});
  }

}
