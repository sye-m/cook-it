import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService) { 
    this.auth.isLoggedIn().subscribe(data=>console.log(data.auth));
  }

  ngOnInit() {
  }
  logout(){
    this.auth.logout().subscribe(data=>console.log(data));
  }

}
