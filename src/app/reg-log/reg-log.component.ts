import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { User } from "./user.model";
import { RegUser } from './RegUser.model';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import { FlashMessagesService } from 'angular2-flash-messages';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reg-log',
  templateUrl: './reg-log.component.html',
  styleUrls: ['./reg-log.component.css']
})
export class RegLogComponent implements OnInit {
show:Boolean = false;
user:Boolean;
regFormData:FormGroup;
logFormData:FormGroup;
email:FormControl;
name:FormControl;
user_name:FormControl;
password:FormControl;
password2:FormControl;
pic:String;
logEmail:FormControl;
logPassword:FormControl;

   constructor(private router:Router, private auth:AuthService,private flash:FlashMessagesService) {
  this.checkUser();
  }

  ngOnInit() {
    this.checkUser();
    this.email = new FormControl('',[Validators.required,Validators.email]);
    this.name = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.user_name = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]);
    this.password = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.password2 = new FormControl('',[Validators.required,Validators.minLength(3)]);;
    this.logEmail = new FormControl('',[Validators.required,Validators.email]);
    this.logPassword = new FormControl('',[Validators.required,Validators.minLength(3)]);
    

    this.regFormData = new FormGroup({
      name: this.name,
      user_name: this.user_name,
      email: this.email,
      password: this.password
  });
  this.logFormData = new FormGroup ({
    email: this.logEmail,
    password: this.logPassword
  })
  }

  passwordCheck(control:FormControl):{[s:string]:boolean}{
if(this.password.value == control.value){
  console.log("Password  1"+this.password.value+"Password 2 value"+control.value);
  console.log({'passNotMatch':false})
  return {'passNotMatch':false}
}
else{
  console.log("Password  1"+this.password.value+"Password 2 value"+control.value);

  console.log({'passNotMatch':true})

  return {'passNotMatch':true}
}
  }

  
   async checkUser(){
  await  this.auth.isLoggedIn().toPromise().then(data => this.user = data.auth).catch(err=>{});
  if(this.user){
    this.router.navigate(['/home']);
  }
  else{
    this.router.navigate(['/user']);
    }
  }


  onReg(){
    const user = new User(
      this.regFormData.value.name,
      this.regFormData.value.user_name,
      this.regFormData.value.email,
      this.regFormData.value.password
    );
    console.log("This is user data:"+JSON.stringify(user));
    this.auth.signup(user)
    .subscribe(
        data => console.log(),
        error => console.error(error)
    );
  this.regFormData.reset();
  this.password2.reset();
  }

    onLogin(){
    const user = new RegUser(
      this.logFormData.value.email,
      this.logFormData.value.password
    )
     this.auth.login(user)
      .subscribe(data => {
        console.log(data);
        this.auth.auth = true;
      this.router.navigate(['/home']);

      }, error => {
        
        var obj = JSON.parse(error._body);
        this.flash.show(obj.info.message,{cssClass:"alert alert-danger",timeout:2000})
      });

    

  }

}
