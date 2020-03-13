import { Router } from '@angular/router';
import { PostService } from './../services/post.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
@Input('post')post;
  constructor() { 
  }

  ngOnInit() {
    
   
  }

  
  

}
