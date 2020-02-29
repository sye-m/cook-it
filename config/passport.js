var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      console.log(email+password+"hey");
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {

          if (err) throw err;
          if (isMatch) {
            console.log("is match is:"+isMatch);
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    console.log(user._id);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {

    User.findById(id, function(err, user) {
      console.log("User Id:"+id);
      done(err, user);
    });
  });

