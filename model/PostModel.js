const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PostSchema = new Schema({
    title: String,
    content: String,
    category:String,
    author: String,
    views: {
      type:Number,
      default:0
    },
    date: {
      type: Date,
      default: Date.now
    }
})

module.exports = PostModel = mongoose.model('Post', PostSchema);