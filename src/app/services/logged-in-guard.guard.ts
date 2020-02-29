import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  isUser:boolean;

  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.auth.isLoggedIn().subscribe(data => this.isUser = data.auth);
      if(!this.isUser){
        this.router.navigate(['/user']);
      }
      else{
      return this.isUser;
      }
  }
  
}
