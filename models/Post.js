var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = new Schema({
    title: {type: String, required: true},
    post_id:{type:String},
    by:{type:String},
    content:{"story":String,"recipe":String,"ingredients":String},
    date:{type:String,required:true},
    likes_by:[{"by":String}],
    likes_count:{type:Number},
    comments:[{"by":String,"comment":String}],
    image:{type:String}
});


module.exports = mongoose.model('Post', post);