var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/userModel');

module.exports = function(app){
  passport.serializeUser(function(user,done){
    done(null,user);
  });
  passport.deserializeUser(function(user,done){
    done(null,user);
  });
  
  passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'https://mfrashad-todo-app.herokuapp.com/auth/google/callback'},
    function(token,refreshToken,profile,done){
      
      var query = {'google.id':profile.id};
      User.findOne(query,function(err,user){
        if(user){
          console.log('found');
          done(null,user);
        } else {
          console.log('not found');
          var user = new User;
          user.displayName = profile.displayName;
          user.image = profile._json.image.url;
          user.email = profile.emails[0].value;
          user.google = {};
          user.google.id = profile.id;
          user.google.token = token;
          user.tasks = [];
          user.save();
          done(null,user);
        }
      });

    }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
}