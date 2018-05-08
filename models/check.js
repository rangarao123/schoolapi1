
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmpSchema = new Schema({
  name : String,
  salary :String,
  age:String
});
module.exports = mongoose.model('Employee', EmpSchema);
