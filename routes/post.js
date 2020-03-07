var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
const fs = require('fs');

var Post = require('../models/Post');
 router.post('/',function(req,res,next){
var post_id = uuid();
const {post_pic, title, story, recipe, ingredients,by} = req.body;
try {
     fs.mkdirSync('public/assets/post_uploads/'+by);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
var post_image = "user_"+by+"_"+post_id+"."+post_pic.image_type;
var post = new Post({
    title: title,
    post_id:post_id,
    by:by,
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

 router.get('/explore',function(req,res,next){
     
     Post.find({},function(err,result){
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

module.exports = router;
