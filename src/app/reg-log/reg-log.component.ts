import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { User } from "./user.model";
import { RegUser } from './RegUser.model';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

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
regFormData:FormGroup;
logFormData:FormGroup;
email:FormControl;
name:FormControl;
user_name:FormControl;
password:FormControl;
password2:FormControl;
  constructor(private router:Router, private auth:AuthService) {}
  ngOnInit() {
    this.email = new FormControl('',[Validators.required,Validators.email]);
    this.name = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.user_name = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]);
    this.password = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.password2 = new FormControl('',[Validators.required,this.passwordCheck.bind(this)]);

    this.regFormData = new FormGroup({
      name: this.name,
      user_name: this.user_name,
      email: this.email,
      password: this.password
  });
  this.logFormData = new FormGroup ({
    email: this.email,
    password: this.password
  })
  }

  passwordCheck(control:FormControl):{[s:string]:boolean}{
if(this.password.value == this.password2){
  return {'passNotMatch':false}
}
else{
  return {'passNotMatch':true}
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
  }

  async onLogin(){
    const user = new RegUser(
      this.logFormData.value.email,
      this.logFormData.value.password
    )
    await this.auth.login(user)
    .subscribe(
        data => {console.log(data);},
        error => console.error(error)
    );
    this.router.navigate(['/home']);
    

  }

}
