
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

var reactBuild = true;

var dotenv = require('dotenv');
dotenv.config();

var db = mongoose.connect(process.env.MONGOLAB_URI);



var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var api = require('./routes/api');

var app = express();


app.use(session({
  secret:'mfrashad',
  resave:false,
  saveUninitialized:false
}));

//Google OAuth Config
require('./config/passport')(app);


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if(reactBuild){
  app.use(express.static('client/build'));
}



//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'node_modules/bootstrap-material-design/dist')));
//app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/users', users);
app.use('/auth', auth);
app.use('/api',api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
