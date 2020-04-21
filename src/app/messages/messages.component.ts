import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  user_id;
  following_ids=[];
  usersData=[];
  all_ids=[];
  users = [];
  sample=[];
  all_users = [];

  constructor(private auth:AuthService,private userService:UserService,private router:Router) { 
    this.user_id = this.auth.userData.user.user_id;
  }

 async ngOnInit() {
  await  this.userService.getMessages(this.user_id).toPromise().then(data=>{
      this.usersData = data.users;
      //get all users with whom this user has interacted with
      this.usersData.forEach(elem=>{
        this.all_ids.push(elem.from)
        this.all_ids.push(elem.to)
      })
      //get all ids from the array except this user's id
      this.all_ids = this.all_ids.filter(element=>{
        if(element != this.user_id){
          return true;
        }
      })
      //remove duplicate copies of user id's with Set Object
      this.all_ids = Array.from(new Set(this.all_ids))
    });

   await this.userService.getUsers(this.all_ids).toPromise().then(data=>{
      this.users = data.users;      
    })
 
    var exists=false;
    //go through all user id's 
    this.all_ids.forEach(elem=>{
      //go through the current users data
      this.usersData.forEach(element=>{
        if(element.from== elem){
          exists = false;
          this.sample.forEach(el =>{
            if(el.element==element.from){
              var i = this.sample.indexOf(el);
              element.messages.forEach(msg =>{
                this.sample[i].messages.push(msg);
              })
              exists = true
            }
            
          })
           if(exists == false){
             //if the user is interacted with for the first time
            this.sample.push({element:element.from,messages:element.messages});
           }
        }
        if(element.to==elem){
          exists = false
          this.sample.forEach(el =>{
            if(el.element==element.to){
              var i = this.sample.indexOf(el);
              element.messages.forEach(msg =>{
                this.sample[i].messages.push(msg);
              })
              exists = true

            }
            
          })
          if(exists == false)
          this.sample.push({element:element.to,messages:element.messages})
        }
      })
    })
   this.users.forEach(element=>{
     this.sample.forEach(elem =>{
      if(element.user_id==elem.element){
        elem.messages.sort(
          function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            if (a.date > b.date) return 1;
            if (a.date <b.date) return -1;
        })
        var msg = elem.messages.pop();
        if(!msg){
          msg = {
            msg:''
          }
        }
        this.all_users.push({user:element,msg:msg})
      }
     })
     
   })
   
    
  }

  
  async establishChat(toUserId){
    //open up socket connection with the person user is trying to communicate.
    await this.userService.establishChat(this.auth.userData.user.user_id,toUserId).toPromise().
    then(data=>{
      this.router.navigate(['/home/m',toUserId]);
    })
  }

}
