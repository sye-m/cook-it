import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { Observable } from "rxjs/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  auth:boolean=false;
  userData;
  signup(user) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response)); 
}

login(user) {
  const body = JSON.stringify(user);
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post('http://localhost:3000/user/login', body, {withCredentials:true,headers: headers})
      .pipe(map((response: HttpResponse<Object>) => response));
      
}

isLoggedIn(){
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.get('http://localhost:3000/user/isLoggedIn', {withCredentials:true,headers: headers})
      .pipe(map((response: HttpResponse<Object>) => {
        this.userData = response;
       return response}));
}

logout(){
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.get('http://localhost:3000/user/logout', {withCredentials:true,headers: headers})
      .pipe(map((response: HttpResponse<Object>) => response));
}
}
