import { ProfileComponent } from './../profile/profile.component';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { Subscription } from 'rxjs';
import {sortBy} from 'underscore';
@Component({
  selector: 'app-messages-view',
  templateUrl: './messages-view.component.html',
  styleUrls: ['./messages-view.component.css']
})
export class MessagesViewComponent implements OnInit,OnDestroy {
  ;
  user;
  from_user_id;
  to_user_id;
  received_messages=[];
  sent_messages=[];
  all_messages=[];
  sub:Subscription;
  sub2:Subscription;
  constructor(private userService:UserService,private route:ActivatedRoute,private chatService:ChatService,private auth:AuthService) {
    this.from_user_id = this.auth.userData.user.user_id;
    this.user = this.auth.userData.user;
    this.to_user_id = this.route.snapshot.paramMap.get('user_id');
   }

   
   ngOnInit() {
     //get the users data with whom the current user is chatting
    this.userService.getUsers(this.to_user_id).toPromise().then((data:any)=>this.user = data.users[0]);
    //establish a socket with the server
    this.chatService.initiateConnection();
    //get all the messages from and for this user
    this.chatService.getAllMessages(this.to_user_id);
    //the messages received will be sorted into one big array
    //this will help is displaying them properly
    this.sub = this.chatService.getMessages(this.to_user_id).subscribe((data:any)=>{
      if(data.sent_messages.length>0){
      data.sent_messages[0].messages.forEach(elem=>{
        
        this.all_messages.push({msg:elem.msg,date:elem.date,id:"sent_message"})
      });
   
    }
    if(data.received_messages.length>0){
      data.received_messages[0].messages.forEach(elem=>{
        this.all_messages.push({msg:elem.msg,date:elem.date,id:"received_message"})
      });
      
    }
     this.all_messages = this.all_messages.sort(
      function(a,b){
        // to get a value that is either negative, positive, or zero.
        if (a.date > b.date) return 1;
        if (a.date< b.date) return -1;
      });
      //automatically scroll to the bottom to get new message
      var objDiv = document.getElementById("messages");
      objDiv.scrollTop = objDiv.scrollHeight;

    })

    //if a new messages is either received or sent subscribe to the change and update the array
    this.sub2 = this.chatService.newMessage().subscribe((data:any)=>{
      
      //@ts-ignore
      if(data.sent_messages){
      //@ts-ignore
      this.all_messages.push({msg:data.sent_messages.$push.messages.msg,date:data.date,id:"sent_message"})
      }
      //@ts-ignore
      if(data.received_messages){
      //@ts-ignore
      this.all_messages.push({msg:data.received_messages.$push.messages.msg,date:data.date,id:"received_message"})
      }
     this.all_messages = this.all_messages.sort(
        function(a,b){
          // to get a value that is either negative, positive, or zero.
          //arrange the all messages array in ascending order
          if (a.date > b.date) return 1;
          if (a.date <b.date) return -1;
        });
        //scroll to the bottom of chat window
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;

    });
   
}

  sendMessage(message:HTMLTextAreaElement){
    this.chatService.sendMessages(this.to_user_id,message.value);
    message.value="";
    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

whichClass(messageId){
  if(messageId=='sent_message'){
    return "sent-message"
  }
  else {
    return "received-message"
  }
}
  ngOnDestroy(){
    document.body.style.overflow="auto";
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.chatService.socketDisconnect();
  }
}
