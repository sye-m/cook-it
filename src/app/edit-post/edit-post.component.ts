import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Post } from '../post/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post;
  editedPost;
  post_id;
  postFormData:FormGroup;
title:FormControl;
story:FormControl;
recipe:Array<String>=[];
ingredients:Array<String>=[];
post_pic;
upload_pic;
recipeSteps:Array<Number>=[];
reader = new FileReader();
noOfIngredients:Array<Number>=[];
  constructor(private auth:AuthService,private postService:PostService,private route:ActivatedRoute,private router:Router) { 
    this.post_id = this.route.snapshot.paramMap.get('post_id');
    this.title = new FormControl();
    this.story = new FormControl();
    this.postFormData = new FormGroup({
      title:this.title,
      story:this.story,
    })
  }

  async ngOnInit() {
    
    this.postService.singlePost(this.post_id).toPromise().then(data=>{this.post =data.post[0];
    this.title = new FormControl(this.post.title);
    this.story = new FormControl(this.post.content.story);
    this.upload_pic = "http://localhost:3000/"+this.post.image;
    this.recipe = this.post.content.recipe;
    this.ingredients =this.post.content.ingredients;
    var i=0;

    this.recipe.forEach(elem=>{
      this.recipeSteps.push(i)
      i++;
    });
    this.ingredients.forEach(elem=>{
      this.noOfIngredients.push(i);
      i++;
    })
    
  })
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
    this.post_pic=image_data;;
  }

  addIngredient(){
    this.noOfIngredients.push(this.noOfIngredients.length);
  }

  addRecipeSteps(){
    this.recipeSteps.push(this.recipeSteps.length);
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


  editPost(){
    this.ingredients=[];
    this.postFormData = new FormGroup({
      title:this.title,
      story:this.story,
    })
    for(var i =0;i<this.noOfIngredients.length;i++){
      var ingredientInput = (<HTMLInputElement>document.getElementById("ingredient#"+i));
      if(ingredientInput){
       var ingredient = ingredientInput.value;
      }
      this.ingredients.push(ingredient);
    }
    this.recipe=[];
    for(var i =0;i<this.recipeSteps.length;i++){
      var recipeStep = (<HTMLInputElement>document.getElementById("recipeStep#"+i));
      if(recipeStep){
       var recipeS = recipeStep.value;
      }
      this.recipe.push(recipeS);
    }
    this.editedPost = new Post(
      this.post_pic,
      this.postFormData.value.title,
      this.postFormData.value.story,
      this.recipe,
      this.ingredients,
      this.auth.userData.user.user_id
    )
    this.postService.editPost(this.post_id,this.editedPost,this.auth.userData.user).subscribe((data)=>{});
    this.router.navigate(['/home',{ outlets: {navnav: ['p',this.post_id] } }]);
   
  }

}
