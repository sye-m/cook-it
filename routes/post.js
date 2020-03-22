var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var User = require('../models/User');

const fs = require('fs');

var Post = require('../models/Post');
 router.post('/',function(req,res,next){
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
    by:{'user_id':by},
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
    User.find({'user_id':req.body.userData.user_id},function(err,user){
        if(err){
            return res.status(500).json({
                title: 'oops',
            }); 
        }
     var user_ids =[req.body.userData.user_id];
     user[0].following.forEach(data=>user_ids.push(data.user_id));
     console.log(user_ids);

     Post.find({'by.user_id':{$nin:user_ids}},function(err,result){
         if(!err){
             console.log(result)
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
 })

 router.post('/likeOrUnlike',function(req,res,next){
     var isUsersPost=false;
     Post.find({post_id:req.body.post_id},function(err,post){
         //find the user to whom the post belongs
         if(req.body.userData.user_id==post[0].by.user_id){isUsersPost = true;}

         User.find({user_id:post[0].by.user_id},function(err,user){
         if(err){
            return res.status(500).json({
                title: 'oops',
            });
         }
         if(req.body.likeType == "Like"){
             
            //add a notification for post's reator
            //acvtId is the Id which will be used to redirect the user to the activity like the post which was liked
            if(isUsersPost == false){
                //user can like their own post but will not recieve a notification for it
            user[0].update({$push:{'notifications':{'acvtId':req.body.post_id,'by_user_id':req.body.userData.user_id,'message':"just liked your post",'read':false,'activityType':'Post Activity'}}},function(err){console.log("donedone");});
            }
         post[0].update({$push:{'likes_by':{'user_id':req.body.userData.user_id}}},function(err){
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
        user[0].update({$pull:{'notifications':{'acvtId':req.body.post_id,'by_user_id':req.body.userData.user_id,'activityType':'Post Activity'}}},function(err){})

            post[0].update({$pull:{'likes_by':{'user_id':req.body.userData.user_id}}},function(err){
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
 })

 router.post('/homeFeed',function(req,res,next){
     User.find({'user_id':req.body.userData.user_id},function(err,user){
         if(err){
        return res.status(500).json({
            title: 'oops',
        }); 
     }
     var following_id = [];
     user[0].following.forEach(data => following_id.push(data.user_id))
     console.log(following_id);
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

 router.post('/notifPosts',function(req,res,next){
    Post.find({'post_id':{$in:req.body.postIds}},function(err, posts){
       if(err){
           return res.status(500).json({
               title: 'oops',
           }); 
        }
        else {
           return res.status(201).json({
               posts:posts
           }); 
        }
    })
})
 

 router.post('/getUsersPost',function(req,res,next){
     userPosts = [];
     savedPosts = [];
     User.find({'user_id':req.body.user_id},function(err,user){
        if(err){
            return res.status(500).json({
                title: 'oops',
            }); 
         }
         userData={'user_id':user[0].user_id,'user_name':user[0].user_name,'name':user[0].name,'userProfile':user[0].userProfile,'followers':user[0].followers,'following':user[0].following}
         var savedPostsId=[];
         user[0].saved.forEach((val)=>{savedPostsId.push(val.post_id)});

        Post.find({'by.user_id':req.body.user_id},function(err, posts){
       if(err){
           return res.status(500).json({
               title: 'oops',
           }); 
        }
        
        else {
         userPosts = posts; 
         ("userPosts"+posts); 
        }
    })
    Post.find({'post_id':{$in:savedPostsId}},function(err,posts){
        if(err){
            return res.status(500).json({
                title: 'error getting saved Posts',
            }); 
         }
         else{
         savedPosts = posts;
         return res.status(201).json({
            savedPosts:savedPosts,
            userPosts:userPosts,
            userData:userData
        }); 
         }
         
    })
  
})
})

router.post('/editPost',function(req,res,next){
    console.log('editPost')
    var by = req.body.userData.user_id;
var post_image = "user_"+by+"_"+req.body.postId+"."+req.body.editedPost.post_pic.image_type;

Post.find({'post_id':req.body.postId},function(err,post){
    fs.unlink("public/"+post[0].image,function(err){});
    
console.log("tHIS IS THE POST IMAGE DATA"+post_image)
fs.writeFile("public/assets/post_uploads/"+by+"/"+post_image, new Buffer(req.body.editedPost.post_pic.image_data,"base64"),function(err){})

})
    Post.update({'post_id':req.body.postId},{$set:{
        title:req.body.editedPost.title,
        'content.story':req.body.editedPost.story,
        'content.recipe':req.body.editedPost.recipe,
        'content.ingredients':req.body.editedPost.ingredients,
        'image':"assets/post_uploads/"+by+"/"+post_image

    }},function(err){
        if(err){
            return res.status(500).json({
                title: 'oops',
            }); 
         }
         else {
            return res.status(201).json({
                msg:"edited Post"
            }); 
         }
})
})

router.post('/deletePost',function(req,res,next){
    Post.remove({'post_id':req.body.postId},function(err){
       if(err){
           return res.status(500).json({
               title: 'oops',
           }); 
        }
        else {
           return res.status(201).json({
               msg:"deletedPost"
           }); 
        }
    })
    User.find({user_id:req.body.userData.user_id},function(err,user){
        user[0].update({$pull:{notifications:{'acvtId':req.body.postId}}},function(err){})
    })
})


module.exports = router;
