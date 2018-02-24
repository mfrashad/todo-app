var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/google/callback', passport.authenticate('google',{
  successRedirect:'/',
  failureRedirect: '/error'
}));

router.get('/google', passport.authenticate('google',{
  scope:['profile', 'email']
}));

router.get('/google/logout',function(req,res,next){
  req.logout();
  res.redirect('/');
});

module.exports = router;
