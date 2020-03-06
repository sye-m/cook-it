import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
@Input('user')user;
userData;
following:boolean = false;
  constructor(private auth:AuthService) {
    this.userData = this.auth.userData;
   }

  ngOnInit() {
    if(this.userData.following >1){
    if(this.user.user_id in this.userData.following){
      this.following = true;
    }
  }
  }

}
