var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = new Schema({
    title: {type: String, required: true},
    post_id:{type:String},
    by:{"user_id":String,"user_name":String,"profile_pic":String},
    content:{"story":String,"recipe":[{type:String}],"ingredients":[{type:String}]},
    date:{type:String,required:true},
    likes_by:[{"user_id":String,"user_name":String,"profile_pic":String}],
    comments:[{"by":String,"comment":String,"commented_on":{type:String,default:Date.now()}}],
    image:{type:String}
});


module.exports = mongoose.model('Post', post);