import { UserService } from './../services/user.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, RoutesRecognized } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {
  searchTerm:String;
  users = [];
  sub;
  posts;
  sub2;
  constructor(private activated:ActivatedRoute,private route:ActivatedRoute,private user:UserService,private postService:PostService) {}
  
  ngOnInit() {
    this.sub = this.activated.url.subscribe((ev)=> {this.search();})
  }

  search(){
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm')
    this.sub2 = this.user.getUsersandPosts(this.searchTerm).subscribe(data=>{
      this.posts = data.posts;
      this.users = data.users});
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }
}
