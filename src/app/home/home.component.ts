import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private route:ActivatedRoute) { 
  }
  openSidenav:boolean =false;
  searchTerm:FormControl;
   ngOnInit() {
     this.searchTerm = new FormControl('');     
  }

  search(){
    this.router.navigate(['/home',{ outlets: {navnav: ['search',this.searchTerm.value] } }]);

  }
   async logout(){
     await this.auth.logout().toPromise().then(data=>console.log(data));
    this.router.navigate(['/user']);
  }

}
