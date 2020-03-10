import { ActivatedRoute } from '@angular/router';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
post_id:String;
post;
  constructor(private postService:PostService,private route:ActivatedRoute) { 
    this.post_id = this.route.snapshot.paramMap.get('post_id');
  }

  async ngOnInit() {
   await this.postService.singlePost(this.post_id).toPromise().then(data=>this.post =data.post[0]);
    console.log(this.post.by)
  }

}
