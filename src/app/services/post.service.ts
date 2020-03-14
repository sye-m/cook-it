import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:Http) { }

  post(post,userData){
    const body = JSON.stringify({post:post,userData:userData});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/post', body, {headers: headers})
        .pipe(map((response: Response) => response.json()));
  }
  explore(userData){
    const body = JSON.stringify({userData:userData});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/post/explore',body, {headers: headers})
        .pipe(map((response: Response) => response.json()));
  }

  likeOrUnlike(postId,userData,likeOrUnlike){
    const body = JSON.stringify({'post_id':postId,'userData':userData,'likeType':likeOrUnlike});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/post/likeOrUnlike', body, {headers: headers})
        .pipe(map((response: Response) => response.json()));
  }

  homeFeed(userData){
    const body = JSON.stringify({userData:userData});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/post/homeFeed',body, {headers: headers})
        .pipe(map((response: Response) => response.json()));
  }

  singlePost(postId){
    const body = JSON.stringify({postId:postId});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/post/singlePost',body, {headers: headers})
        .pipe(map((response: Response) => response.json()));
  }

  getUsersPost(userId){
    const body = JSON.stringify({user_id:userId});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/post/getUsersPost',body, {headers: headers})
        .pipe(map((response: Response) => response.json()));
  }
}
