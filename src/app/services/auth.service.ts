import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { map } from 'rxjs/operators';

import { Observable } from "rxjs/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:Http) { }
  auth:boolean=false;
  userData;
  signup(user) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
        .pipe(map((response: Response) => response.json())); 
}

login(user) {
  const body = JSON.stringify(user);
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.post('http://localhost:3000/user/login', body, {withCredentials:true,headers: headers})
      .pipe(map((response: Response) => response.json()));
      
}

isLoggedIn(){
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.get('http://localhost:3000/user/isLoggedIn', {withCredentials:true,headers: headers})
      .pipe(map((response: Response) => {
        this.userData = response.json();
        
       return response.json()}));
}

logout(){
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.get('http://localhost:3000/user/logout', {withCredentials:true,headers: headers})
      .pipe(map((response: Response) => response.json()));
}
}
