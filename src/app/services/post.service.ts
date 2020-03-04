import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:Http) { }

  post(post){
    const body = JSON.stringify(post);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/post', body, {headers: headers})
        .pipe(map((response: Response) => response.json()));
  }
}
