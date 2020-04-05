import { AuthService } from './../services/auth.service';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from './post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
postFormData:FormGroup;
title:FormControl;
story:FormControl;
recipe:Array<String>=[];
ingredients:Array<String>=[];
post_pic;
upload_pic;
recipeSteps:Array<Number>=[0];
reader = new FileReader();
noOfIngredients:Array<Number>=[0];
  constructor(private post:PostService, private auth:AuthService, private router:Router ) { }

  ngOnInit() {
    this.title = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.story = new FormControl('',[Validators.required,Validators.minLength(3)]);
    this.postFormData = new FormGroup({
      title:this.title,
      story:this.story,
    })
  }
  getImageData(e,image){
    var image_data = {"image_data":this.reader.result.toString().split(",")[1],"image_type":image.type.split("/")[1]}
    this.post_pic = image_data;

  }
   getImage(){
     //@ts-ignore
 var image = document.getElementById('post_pic').files[0];
    this.reader.readAsDataURL(image);
    this.reader.addEventListener('load',(event) =>{ this.upload_pic = this.reader.result;this.getImageData(event, image)});
  }

  addIngredient(){
    this.noOfIngredients.push(this.noOfIngredients.length);
  }

  addRecipeSteps(){
    this.recipeSteps.push(this.recipeSteps.length);
    
  }
  
  async onPost(event){
    for(var i =0;i<this.noOfIngredients.length;i++){
      var ingredientInput = (<HTMLInputElement>document.getElementById("ingredient#"+i));

      if(ingredientInput){
       var ingredient = ingredientInput.value;
      }
      this.ingredients.push(ingredient);
    }
    for(var i =0;i<this.recipeSteps.length;i++){
      var recipeStep = (<HTMLInputElement>document.getElementById("recipeStep#"+i));
      if(recipeStep){
       var recipeS = recipeStep.value;
      }
      this.recipe.push(recipeS);
    }
    const post = new Post(
      this.post_pic,
      this.postFormData.value.title,
      this.postFormData.value.story,
      this.recipe,
      this.ingredients,
      this.auth.userData.user.user_id
    )
 await this.post.post(post).subscribe(data=>{
 this.router.navigate(['/home',{ outlets: {navnav: ['p',data.message.post_id] } }]);

 });
  
  }
  getPostImage(data){
    return 'data:image/jpeg;base64,' + data;
  }

}
