import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Http,Headers,Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  from_user_id;
  socket = io.connect('http://localhost:4000/');
  userSocket;
  constructor(private auth:AuthService,private http:Http) {
    this.from_user_id=this.auth.userData.user.user_id
    
   }
  
   initiateConnection(){
    console.log("initiate connection")
    this.socket.emit('connected user id', {from_user_id:this.from_user_id});
  this.userSocket = io.connect('http://localhost:4000/'+this.from_user_id);

    this.userSocket.on('connect',function(){
      console.log("user Socket connected");
    })
    console.log("user Socket")
   }
 

  getAllMessages(to_user_id){
     console.log("inside get All messages")
   this.userSocket.emit('get messages', {from_user_id:this.from_user_id,to_user_id:to_user_id});
   }

  getMessages(to_user_id){
     var observable;  
     observable = new Observable<Object>(observer=>{
      this.userSocket.on('all messages', (data)=>{
          observer.next(data);
          console.log(data)
      });
      return () => {this.userSocket.disconnect();}
  });
  return observable;
   }

  sendMessages(to_user_id,message){
     console.log(to_user_id,message)
    this.userSocket.emit('send message',{from_user_id:this.from_user_id,to_user_id:to_user_id,message:message});
   }

  newMessage(){
   var observable = new Observable(observer=>{
      this.userSocket.on('new messages', (data)=>{
          observer.next(data);
          console.log(data)
      });
      return () => {this.userSocket.disconnect();}
  });
  return observable;
   }

  socketDisconnect(){
    this.userSocket.disconnect();
    this.socket.disconnect();
   }
   }
   
 
  



