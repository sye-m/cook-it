import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  post(post){
    const body = JSON.stringify({post:post});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post', body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }
  explore(userData){
    const body = JSON.stringify({userData:userData});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post/explore',body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }

  likeOrUnlike(postId,userData,likeOrUnlike){
    const body = JSON.stringify({'post_id':postId,'userData':userData,'likeType':likeOrUnlike});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post/likeOrUnlike', body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }

  homeFeed(userData){
    const body = JSON.stringify({userData:userData});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post/homeFeed',body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }

  singlePost(postId){
    const body = JSON.stringify({postId:postId});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post/singlePost',body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }

  
  getNotifPosts(userAndPostsIds){
    const body = JSON.stringify({userAndPostsIds});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post/notifPosts',body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }

  getUsersPost(userId){
    const body = JSON.stringify({user_id:userId});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post/getUsersPost',body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }

  editPost(postId,editedPost,userData){
    const body = JSON.stringify({postId:postId,editedPost:editedPost,userData:userData});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post/editPost',body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }

  deletePost(postId,userData){
    const body = JSON.stringify({postId:postId,userData:userData});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/post/deletePost',body, {headers: headers})
        .pipe(map((response: HttpResponse<Object>) => response));
  }
}
