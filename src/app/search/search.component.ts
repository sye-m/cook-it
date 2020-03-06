import { UserService } from './../services/user.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, RoutesRecognized } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchTerm:String;
users = [];
  constructor(private activated:ActivatedRoute,private route:ActivatedRoute,private user:UserService) {
   }

  ngOnInit() {
    this.activated.url.subscribe((ev)=> {
     this.search();
      
    })
      

  }

  search(){
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm')
    this.user.getUsers(this.searchTerm).subscribe(data=>this.users = data.result);

  }

}
