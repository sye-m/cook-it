var mongoose = require('mongoose');
var uuid = require('uuid/v4');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var userProfileSchema = new Schema({
    bio:{type:String,default:"Edit your profile and enter your bio"},
    profile_pic:{type:String, default:"../assets/profile_pic/default_profile_pic.jpg"},
    location:{type:String, default:"None"}
})
var user = new Schema({
    name: {type: String, required: true},
    user_id:{type:String, required:true,default:uuid()},
    user_name:{type:String, required:true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    date_joined:{type:Date,required:true,default:Date.now()},
    userProfile:[userProfileSchema],
    followers:[{"user_id":String,"user_name":String,"profile_pic":String}],
    following:[{"user_id":String,"user_name":String,"profile_pic":String}],
    follow_req:[{"user_id":String,"user_name":String,"profile_pic":String}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});


module.exports = mongoose.model('User', user);