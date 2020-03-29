import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-messages-view',
  templateUrl: './messages-view.component.html',
  styleUrls: ['./messages-view.component.css']
})
export class MessagesViewComponent implements OnInit,OnDestroy {
  user_id;
  from_user_id;
  to_user_id;
  received_messages=[];
  sent_messages=[];
  sub:Subscription;
  sub2:Subscription;
  constructor(private route:ActivatedRoute,private chatService:ChatService,private auth:AuthService) {
    this.from_user_id = this.auth.userData.user.user_id;
    this.to_user_id = this.route.snapshot.paramMap.get('user_id');
    
   }

   
   ngOnInit() {
    this.chatService.initiateConnection();

    this.chatService.getAllMessages(this.to_user_id);
  this.sub = this.chatService.getMessages(this.to_user_id).subscribe(data=>{
  console.log("got messages"+data);
  })
  this.sub2 = this.chatService.newMessage().subscribe(function(data:{sent_messages,received_messages}){
    console.log("sent messages");
    console.log(data)
      });
}

  sendMessage(message:HTMLTextAreaElement){
    console.log('send Message')
    this.chatService.sendMessages(this.to_user_id,message.value);
    message.value="";
  }


  ngOnDestroy(){
    this.chatService.socketDisconnect();
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
