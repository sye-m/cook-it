import { UserService } from './../services/user.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, RoutesRecognized } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchTerm:String;
users = [];
  constructor(private activated:ActivatedRoute,private route:ActivatedRoute,private user:UserService,private postService:PostService) {
   }
posts;
  ngOnInit() {
    this.activated.url.subscribe((ev)=> {
     this.search();
    })
      

  }

  search(){
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm')
    this.user.getUsersandPosts(this.searchTerm).subscribe(data=>{
      console.log("This is the data"+data);
      this.posts = data.posts;
      this.users = data.users});
  }

}
