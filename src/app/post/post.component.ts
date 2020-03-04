import { AuthService } from './../services/auth.service';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
postFormData:FormGroup;
title:FormControl;
story:FormControl;
recipe:FormControl;
ingredients:FormControl;
post_pic:Object;
reader = new FileReader();
imgPath:String="fsdfsd";
  constructor(private post:PostService, private auth:AuthService ) { }

  ngOnInit() {
    this.title = new FormControl();
    this.story = new FormControl();
    this.recipe = new FormControl();
    this.ingredients = new FormControl();
    this.postFormData = new FormGroup({
      title:this.title,
      story:this.story,
      recipe:this.recipe,
      ingredients:this.ingredients,
    })
  }
  getImageData(e,image){
    var image_data = {"image_data":this.reader.result.toString().split(",")[1],"image_type":image.type.split("/")[1]}
    console.log(image_data+"image")
    this.post_pic = image_data;

  }
   getImage(){
     //@ts-ignore
 var image = document.getElementById('post_pic').files[0];

    this.reader.readAsDataURL(image);
    this.reader.addEventListener('load',(event) => this.getImageData(event, image));
     
  }

  
  async onPost(event){
    console.log();
    const post = new Post(
      this.post_pic,
      this.postFormData.value.title,
      this.postFormData.value.story,
      this.postFormData.value.recipe,
      this.postFormData.value.ingredients,
      this.auth.userData.user.user_id
    )
 await   this.post.post(post).toPromise().then(data =>{ 
      console.log(data);
      this.imgPath = data.path});
console.log(post);
  }
  getPostImage(data){
    return 'data:image/jpeg;base64,' + data;
  }

}
