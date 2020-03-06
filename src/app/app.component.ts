import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private auth:AuthService,private router:Router,private route:ActivatedRoute) { 
  }
  openSidenav:boolean =false;
  searchForm:FormGroup;
  searchTerm:FormControl;
   ngOnInit() {
     this.searchTerm = new FormControl('');
     this.searchForm = new FormGroup({
       searchTerm:this.searchTerm
     });
     
  }

  search(){
    this.router.navigate(['/home',{ outlets: {navnav: ['search'] } }]);

  }
   async logout(){
     await this.auth.logout().toPromise().then(data=>console.log(data));
    this.router.navigate(['/user']);
  }
}
