import { Profile } from './edit_profile.model';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit,OnDestroy {
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
  sub;
  user;
  isPosting:boolean = false;
  constructor(private auth:AuthService,private userService:UserService,private router:Router) {
    this.user = this.auth.userData.user;

   }

  async ngOnInit() {
    this.user = this.auth.userData.user;

    this.upload_pic = "http://localhost:3000/"+this.user.userProfile[0].profile_pic;
    this.email = new FormControl(this.user.email,[Validators.required,Validators.email]);
    this.name = new FormControl(this.user.name,[Validators.required,Validators.minLength(3)]);
    this.user_name = new FormControl(this.user.user_name,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]);
    this.password = new FormControl('',[Validators.minLength(3)]);
    this.password2 = new FormControl('',[Validators.minLength(3)]);;
    this.bio = new FormControl(this.user.userProfile[0].bio);
    this.profileFormData = new FormGroup({
      name: this.name,
      user_name: this.user_name,
      email: this.email,
      password: this.password,
      bio:this.bio,
  });
  //read the current profile pic as blob
    let blob = await fetch(this.upload_pic).then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      //convert the blob to data
      reader.readAsDataURL(blob);
    })
    //seperate the image data and data type for further processing on server side
    var image_data = {"image_data":dataUrl.toString().split(",")[1],"image_type":blob.type.split("/")[1]}
    //profile pic will contain the image data
    this.profile_pic=image_data;    
  }

  onProfileSubmit(){
    var button = <HTMLInputElement>document.getElementById("post-button");
    button.disabled = true;
    this.isPosting = true;
    const profile = new Profile(
      this.profileFormData.value.name,
      this.profileFormData.value.user_name,
      this.profileFormData.value.email,
      this.profileFormData.value.password,
      this.profileFormData.value.bio,
      this.profile_pic
    )
    this.sub = this.userService.editProfile(this.user,profile).subscribe(data=>{
      this.isPosting = false;
    });
    this.router.navigate(['/home/profile',this.user.user_id]);
  }

  getImageData(e,image){
    var image_data = {"image_data":this.reader.result.toString().split(",")[1],"image_type":image.type.split("/")[1]}
    this.profile_pic = image_data;

  }
   getImage(){
     //@ts-ignore
    var image = document.getElementById('profile_pic').files[0];

    this.reader.readAsDataURL(image);
    this.reader.addEventListener('load',(event) =>{ this.upload_pic = this.reader.result;this.getImageData(event, image)});
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
