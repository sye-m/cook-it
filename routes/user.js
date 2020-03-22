var express = require('express');
var uniqid = require('uniqid');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var User = require('../models/User');
var Post = require('../models/Post');
const fs = require('fs');

router.post('/', function (req, res, next) {
    User.findOne({'email':req.body.email},function(err,userExists){
      
      if(userExists){
        return res.status(500).json({
          message: 'user already exists',
         user :req.body 
      });
      }

      else {
        const { name,user_name, email, password } = req.body;
        let errors = [];
        var user_id = uniqid(user_name);
      
        if (!name || !user_name || !email || !password  ) {
          errors.push({ msg: 'Please enter all fields' });
          
        }
        if (password.length < 6) {
          errors.push({ message: 'Password must be at least 6 characters' });
        }
        
        
    
    if(errors.length > 0){
        res.status(400).json({
            errors:errors
        })
    }
        var user = new User({
          name:req.body.name,
          user_id:user_id,
          user_name:req.body.user_name,
          password:bcrypt.hashSync(req.body.password, 10),
          email: req.body.email,
          userProfile:{},
          followers:[],
          following:[],
          messages: [],
          saved:[],
          notifications:[]
      });
  
        
    user.save(function(err, result) {
      if (err) {
          return res.status(500).json({
              title: 'oops',
              error: req.body
          });
      }
      res.status(201).json({
          message: 'User created',
          obj: result
      });
  });
      }
    })
  
    
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json({info}); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      else {
      return res.status(200).json({auth:req.isAuthenticated(),user:user+"this is useer",message:'Login Success'});
      }
    });
  })(req, res, next);
  });

  router.get('/isLoggedIn',function(req,res,next){
    if(req.isAuthenticated())
    return res.status(200).json({auth:true,user:req.user});
    else return res.status(401).json({message:'Bad Request'});
  } )

  router.post('/getUsers',function(req,res,next){
    var user_ids = req.body.user_ids;
    console.log("user_ids are"+user_ids);
    var users=[];
    User.find({'user_id':{$in:user_ids}},function(err,result){  
      if(!err){

        result.forEach(element =>{
          user_id = element.user_id;
          user_name=element.user_name;
          profile_pic = element.userProfile[0].profile_pic;
          users.push({user_id:user_id,user_name:user_name,profile_pic:profile_pic});
        } )
        console.log("user.js users"+users);
        return res.status(200).json({
          users:users,
        })
      }
    else{
      return  res.status(401).json({result:result});
    }
    })
  })
  router.post('/getUsersandPosts',function(req,res,next){
  var user_id, profile_pic,user_name;
  var followers = [],following=[];
  var users = [];
  var posts =[];
  const searchTerm = req.body.searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s'"]/g, "\\$&");
User.find({user_name:{$regex:searchTerm,$options:'i'}},function(err,result){
  if(!err){

    result.forEach(element =>{
      user_id = element.user_id;
      user_name=element.user_name;
      profile_pic = element.userProfile[0].profile_pic;
      followers = element.followers;
      following = element.following
      users.push({user_id:user_id,user_name:user_name,profile_pic:profile_pic,followers:followers,following:following});
    } )
  }
  
  Post.find({title:{$regex:searchTerm,$options:'i'}},function(err,posts){
    if(!err){
      return res.status(200).json({
        users:users,
        posts:posts
      })
    }
    else{
      return  res.status(401).json({result:result});
    }
    })
 
})


  })

  router.post('/followUser',function(req,res,next){

    User.find({user_id:req.body.user.user.user_id},function(err,user){
      User.find({user_id:req.body.followUser.user_id}, function(err, possibleFriend){
        possibleFriend[0].update({$push:{'followers':{'user_id':user[0].user_id},'notifications':{'acvtId':possibleFriend[0].user_id,'by_user_id':user[0].user_id,'message':"just followed you",'read':false,'activityType':'Account Activity'}}},function(err){})
        user[0].update({$push:{'following':{'user_id':possibleFriend[0].user_id}}},function(err){}) 
      })
      return res.status(200).json({message:'Read all'});

    })
  })


  
  router.post('/unfollowUser',function(req,res,next){
  
    
    User.find({user_id:req.body.user.user.user_id},function(err,user){
      User.find({user_id:req.body.unfollowUser.user_id}, function(err, possibleFriend){
        possibleFriend[0].update({$pull:{'followers':{'user_id':user[0].user_id},'notifications':{'by_user_id':user[0].user_id,'activityType':'Account Activity'}}},function(err){})
        user[0].update({$pull:{'following':{'user_id':possibleFriend[0].user_id}}},function(err){}) 
      
      })
      return res.status(200).json({message:'Read all'});

    })
  
      
            
  })

  router.post('/readAll',function(req,res,next){
    User.find({user_id:req.body.user.user_id},function(err, user){
      user[0].update({'notifications.$[].read':true},function(err){
        if(err){
          return res.status(500).json({message:err});
            }
            else {
          return res.status(200).json({message:'Read all'});
      
            }
      });
     
    })
  })
  
  router.post('/saveOrUnSave',function(req,res,next){
    User.find({user_id:req.body.user_id},function(err,user){
      if(err){
         return res.status(500).json({
             title: 'oops',
         });
      }
      if(req.body.saveType == "Save"){
      user[0].update({$push:{'saved':{'post_id':req.body.post_id}}},function(err){
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
      user[0].update({$pull:{'saved':{'post_id':req.body.post_id}}},function(err){
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

  router.post('/editProfile',function(req,res,next){
    try {
      fs.mkdirSync('public/assets/profile_pics/'+req.body.userData.user_id);
   } catch (err) {
     if (err.code !== 'EEXIST') throw err
   }
var profile_pic = "user_"+req.body.userData.user_id+"."+req.body.newUserData.profile_pic.image_type;
fs.unlink("public/assets/profile_pics"+req.body.userData.user_id+"/"+req.body.userData.userProfile[0].profile_pic,function(err){});
fs.writeFile("public/assets/profile_pics/"+req.body.userData.user_id+"/"+profile_pic, new Buffer(req.body.newUserData.profile_pic.image_data,"base64"),function(err){})
if(req.body.newUserData.password!=''){
    User.updateOne({'user_id':req.body.userData.user_id},{$set:{
      name:req.body.newUserData.name,
      user_name:req.body.newUserData.user_name,
      email:req.body.newUserData.email,
      'userProfile.$[].bio':req.body.newUserData.bio,
      password:bcrypt.hashSync(req.body.newUserData.password, 10),
      'userProfile.$[].profile_pic':"assets/profile_pics/"+req.body.userData.user_id+"/"+profile_pic
    }},function(err){

      if(err){
        return res.status(500).json({
            title: 'something is wrong',
        }); 
     }
     else {
        return res.status(201).json({
            message: 'User added',
        }); 
     }

    })
  }
  else{
    User.updateOne({'user_id':req.body.userData.user_id},{$set:{
      name:req.body.newUserData.name,
      user_name:req.body.newUserData.user_name,
      email:req.body.newUserData.email,
      'userProfile.$[].bio':req.body.newUserData.bio,
      'userProfile.$[].profile_pic':"assets/profile_pics/"+req.body.userData.user_id+"/"+profile_pic
    }},function(err){

      if(err){
        return res.status(500).json({
            title: 'something is wrong',
        }); 
     }
     else {
        return res.status(201).json({
            message: 'User added',
        }); 
     }

    })
  }
  })
  router.get('/logout',isValidUser, function(req,res,next){
    req.logout();
    return res.status(200).json({message:'Logout Success'});
  })


  function isValidUser(req,res,next){
    if(req.isAuthenticated())
    {
next();
    
    }

    else return res.status(401).json({message:'Bad Request'});
  }
  
module.exports = router;
