var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');

const fs = require('fs');

var Post = require('../models/Post');
 router.post('/',function(req,res,next){
     console.log(req.body.userData.userProfile)
     var post_id = uniqid(Date.now());
const {post_pic, title, story, recipe, ingredients,by} = req.body.post;
try {
     fs.mkdirSync('public/assets/post_uploads/'+by);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
var post_image = "user_"+by+"_"+post_id+"."+post_pic.image_type;
var post = new Post({
    title: title,
    post_id:post_id,
    by:{'user_id':req.body.userData.user_id,'user_name':req.body.userData.user_name,'profile_pic':req.body.userData.userProfile[0].profile_pic},
    content:{"story":story,"recipe":recipe,"ingredients":ingredients},
    date:Date.now(),
    likes_by:[],
    likes_count:0,
    comments:[],
    image:"assets/post_uploads/"+by+"/"+post_image
})
fs.writeFile("public/assets/post_uploads/"+by+"/"+post_image, new Buffer(post_pic.image_data,"base64"),function(err){
    if(!err){
        post.save(function(err,result){
            if (err) {
                return res.status(500).json({
                    title: 'oops',
                    error: req.body.title
                });
            }
            else{
            return res.status(201).json({
                message: 'Post created',
                
            });
        }
        })
    }
    else {
        return res.status(500).json({
            title: 'oops',
            error: req.body.title
        });
    }
})
 })

 router.post('/explore',function(req,res,next){
     var user_ids =[];
     req.body.userData.following.forEach(data=>user_ids.push(data.user_id));
     Post.find({'by.user_id':{$nin:[req.body.userData.user_id]}},function(err,result){
         console.log(result);
         if(!err){
            return res.status(201).json({
                message: 'Post created',
                result:result
            });
         }
         else{
            return res.status(500).json({
                title: 'oops',
                error: req.body.title
            }); 
         }

     })
 })

 router.post('/likeOrUnlike',function(req,res,next){
    console.log(req.body.post_id,req.body.userData,req.body.likeType);

     Post.find({post_id:req.body.post_id},function(err,post){
         if(err){
            return res.status(500).json({
                title: 'oops',
            });
         }
         if(req.body.likeType == "Like"){
         post[0].update({$push:{'likes_by':{'user_id':req.body.userData.user_id,'user_name':req.body.userData.user_name,'profile_pic':req.body.userData.userProfile.profile_pic}}},function(err){
             if(err){
                return res.status(500).json({
                    title: 'oops',
                }); 
             }
             else {
                return res.status(201).json({
                    message: 'Post created',
                }); 
             }

         })
        }
        else {
            post[0].update({$pull:{'likes_by':{'user_id':req.body.userData.user_id,'user_name':req.body.userData.user_name,'profile_pic':req.body.userData.userProfile.profile_pic}}},function(err){
                if(err){
                   return res.status(500).json({
                       title: 'oops',
                   }); 
                }
                else {
                   return res.status(201).json({
                       message: 'Post created',
                   }); 
                }
   
            })
        }
     })
 })

 router.post('/homeFeed',function(req,res,next){
     var following_id = [];
     req.body.userData.following.forEach(data => following_id.push(data.user_id));
     Post.find({'by.user_id':{$in:following_id}},function(err,result){
         if(err){
            return res.status(500).json({
                title: 'oops',
            }); 
         }
         else {
            return res.status(201).json({
                result:result
            }); 
         }

     })
 })

 router.post('/singlePost',function(req,res,next){
     Post.find({'post_id':req.body.postId},function(err, post){
        if(err){
            return res.status(500).json({
                title: 'oops',
            }); 
         }
         else {
            return res.status(201).json({
                post:post
            }); 
         }
     })
 })
module.exports = router;
