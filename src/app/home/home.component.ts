import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { 
  }
    openSidenav:boolean =false;
 
   ngOnInit() {
  }
   async logout(){
     await this.auth.logout().toPromise().then(data=>console.log(data));
    this.router.navigate(['/user']);
  }

}
