import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  
  getUsers(userId){
    const body = JSON.stringify({'user_ids':userId});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/getUsers', body, {withCredentials:true,headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }
  getUsersandPosts(searchTerm) {
    const body = JSON.stringify({searchTerm:searchTerm});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/getUsersandPosts', body, {withCredentials:true,headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
        
  }

  follow(user,userData){
    const body = JSON.stringify({followUser:user,user:userData});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/followUser', body, {withCredentials:true,headers: headers})
    .pipe(map((response: HttpResponse<Object>) => response));
  }
  
  unfollow(user,userData){
    const body = JSON.stringify({unfollowUser:user,user:userData});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/unfollowUser', body, {withCredentials:true,headers: headers})
    .pipe(map((response: HttpResponse<Object>) => response));
  }

  readAll(userData){
    const body = JSON.stringify({user:userData});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/readAll', body,{withCredentials:true,headers: headers})
    .pipe(map((response: HttpResponse<Object>) => response));
  }


  saveOrUnSave(post_id,user_id,saveType){
    const body = JSON.stringify({'post_id':post_id,'user_id':user_id,'saveType':saveType});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/saveOrUnSave', body,{withCredentials:true,headers: headers})
    .pipe(map((response: HttpResponse<Object>) => response));
  }

  editProfile(userData,newUserData){
    const body = JSON.stringify({'userData':userData,'newUserData':newUserData});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/editProfile', body,{withCredentials:true,headers: headers})
    .pipe(map((response: HttpResponse<Object>) => response));
  
  }

  establishChat(from_user_id,to_user_id){
    const body = JSON.stringify({from_user_id:from_user_id,to_user_id:to_user_id});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/establishChat', body, {withCredentials:true,headers: headers})
    .pipe(map((response: HttpResponse<Object>) => response));
  }

  getMessages(from_user_id){
    const body = JSON.stringify({from_user_id:from_user_id});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/getMessages', body, {withCredentials:true,headers: headers})
    .pipe(map((response: HttpResponse<Object>) => response));
  }

  recommendedUsers(user_id,following){
    const body = JSON.stringify({user_id:user_id,following:following});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/recommendedUsers', body, {withCredentials:true,headers: headers})
    .pipe(map((response: HttpResponse<Object>) => response));
  }

  

}
