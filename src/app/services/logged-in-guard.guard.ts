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
   async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    await this.auth.isLoggedIn().toPromise().then(data=> this.isUser = data.auth).catch(err=>{});
    if(!this.isUser){
          this.router.navigate(['/user']);
         return  this.isUser;
      }
      else{
      return  this.isUser;
      }
  }
  
}
