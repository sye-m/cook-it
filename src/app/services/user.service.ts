import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http,Headers,Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:Http) { }
  
  getUsers(searchTerm) {
    const body = JSON.stringify({searchTerm:searchTerm});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/getUsers', body, {withCredentials:true,headers: headers})
        .pipe(map((response: Response) => response.json()));
        
  }

  follow(user,userData){
    const body = JSON.stringify({followUser:user,user:userData});
    console.log(user,userData)
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/followUser', body, {withCredentials:true,headers: headers})
    .pipe(map((response: Response) => response.json()));
  }
  
  unfollow(user,userData){
    const body = JSON.stringify({unfollowUser:user,user:userData});
    console.log(user,userData)
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/unfollowUser', body, {withCredentials:true,headers: headers})
    .pipe(map((response: Response) => response.json()));
  }

  readAll(userData){
    const body = JSON.stringify({user:userData});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/readAll', body,{withCredentials:true,headers: headers})
    .pipe(map((response: Response) => response.json()));
  }

  saveOrUnSave(post_id,user_id,saveType){
    const body = JSON.stringify({'post_id':post_id,'user_id':user_id,'saveType':saveType});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/saveOrUnSave', body,{withCredentials:true,headers: headers})
    .pipe(map((response: Response) => response.json()));
  
  }
}
