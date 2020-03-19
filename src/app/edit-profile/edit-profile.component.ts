import { Profile } from './edit_profile.model';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileFormData:FormGroup;
  email:FormControl;
  name:FormControl;
  user_name:FormControl;
  bio:FormControl;
  password:FormControl;
  password2:FormControl;
  reader = new FileReader();
  upload_pic;
  profile_pic;

  user;
  constructor(private auth:AuthService,private userService:UserService) {
    this.user = this.auth.userData.user;

   }

  ngOnInit() {
    this.upload_pic = "http://localhost:3000/"+this.user.userProfile[0].profile_pic;

    this.email = new FormControl('',[Validators.required,Validators.email]);
    this.name = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.user_name = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]);
    this.password = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.password2 = new FormControl('',[Validators.required,Validators.minLength(3)]);;
    this.bio = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.profileFormData = new FormGroup({
      name: this.name,
      user_name: this.user_name,
      email: this.email,
      password: this.password,
      bio:this.bio,
  });


  }
  onProfileSubmit(){
    const profile = new Profile(
      this.profileFormData.value.name,
      this.profileFormData.value.user_name,
      this.profileFormData.value.email,
      this.profileFormData.value.password,
      this.profileFormData.value.bio,
      this.profile_pic
    )
    this.userService.editProfile(this.user,profile).subscribe(data=>console.log(data));
  }

  getImageData(e,image){
    var image_data = {"image_data":this.reader.result.toString().split(",")[1],"image_type":image.type.split("/")[1]}
    console.log(image_data+"image")
    this.profile_pic = image_data;

  }
   getImage(){
     //@ts-ignore
 var image = document.getElementById('profile_pic').files[0];
    this.reader.readAsDataURL(image);
    this.reader.addEventListener('load',(event) =>{ this.upload_pic = this.reader.result;this.getImageData(event, image)});
    console.log(this.upload_pic)
  }


}
