var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chat = new Schema({
    from: {type:String},
    to: {type:String},
    messages:[{msg:{type:String},date:{type:Date,required:true,default:Date.now()}}]
});


module.exports = mongoose.model('Chat', chat);