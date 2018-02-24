var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  displayName : String,
  image : String,
  email : String,
  google : Object,
  tasks : Array
});

module.exports = mongoose.model('User', userSchema);