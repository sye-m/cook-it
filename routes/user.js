var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var User = require('../models/User');

router.post('/', function (req, res, next) {
    const { name,user_name, email, password } = req.body;
    let errors = [];
  
    if (!name || !user_name || !email || !password  ) {
      errors.push({ msg: 'Please enter all fields' });
      
    }
  
    
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    console.log(req.body.name);
    var user = new User({
        name:req.body.name,
        user_name:req.body.user_name,
        password:bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        userProfile:{},
        followers:[],
        following:[],
        follow_req:[],
        messages: []
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

if(errors.length > 0){
    res.status(400).json({
        errors:errors
    })
}
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

  router.get('/logout',isValidUser, function(req,res,next){
    req.logout();
    return res.status(200).json({message:'Logout Success'});
  })
  

  function isValidUser(req,res,next){
      console.log(req.isAuthenticated());
    if(req.isAuthenticated())
    {
next();
    
    }

    else return res.status(401).json({message:'Bad Request'});
  }
  
module.exports = router;
