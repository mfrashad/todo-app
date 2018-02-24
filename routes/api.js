var express = require('express');
var router = express.Router();
var User = require('../models/userModel');


router.post('/addTask',function(req,res,next){
  
  if(req.user){
    var task = {task:req.body.task, finished:req.body.finished};
    User.findOne({'google.id':req.user.google.id},function(err,user){
      if(user){
        user.tasks.push(task);
        user.save(function(err){
          if(err) throw err;
        });
      }
    });
  } else {
    //console.log('user not found');
  }
});

router.get('/getTasks', function(req,res,next){
  console.log('not logged in');
  if(req.user){
    User.findOne({'google.id':req.user.google.id}, function(err, user){
      if(err) throw err;
      if(user) res.send(JSON.stringify(user.tasks));
    });
  }
});

router.post('/removeTask',function(req,res,next){
  if(req.user){
    User.findOne({'google.id':req.user.google.id},function(err, user){
      if(err) throw err;
      user.tasks = user.tasks.filter(function(val){return val.task!==req.body.task});
      user.save(function(err){
        if(err) throw err;
      });
    });
  }
});

router.get('/getUser',function(req,res,next){
  if(req.user){
    res.send(req.user);
  }
});

module.exports = router;



