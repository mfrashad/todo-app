var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

var tasks = [{
  task:'Task 1',
  isFinished:false
},{
  task:'Task 2',
  isFinished:true
}  
];


router.post('/addTask',function(req,res,next){
  console.log(req.user);
  if(req.user){
    console.log(req.user.google.id);
    var task = {task:req.body.task, isFinished:req.body.isFinished};
    User.findOne({'google.id':req.user.google.id},function(err,user){
      if(user){
        user.tasks.push(task);
        user.save(function(err){
          if(err) throw err;
        });
      }
    });
  } else {
  console.log('user not found');
  }
});

router.get('/getTasks', function(req,res,next){
  
  if(req.user){
    console.log(req.user.google.id);
    User.findOne({'google.id':req.user.google.id}, function(err, user){
      if(err) throw err;
      if(user) res.send(JSON.stringify(user.tasks));
    });
  }
});

router.post('/addTaskMock', function(req,res,next){
  var task = {task:req.body.task,isFinished:req.body.isFinished};
  tasks.push(task);
  console.log(tasks);
});

router.get('/getTasksMock', function(req,res,next){
 res.send(JSON.stringify(tasks));
  
});

router.post('/removeTask',function(req,res,next){
  if(req.user){
    User.findOne({'google.id':req.user.google.id},function(err, user){
      if(err) throw err;
      user.tasks = user.tasks.filter(function(val){return val.task!==req.body.task});
      console.log(user.tasks);
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

router.get('/test',function(req,res){
  res.send({res:"hello"});
});

module.exports = router;



