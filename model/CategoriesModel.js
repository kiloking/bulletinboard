const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let CategoriesSchema = new Schema({
    title: String,
    backgroundcolor: String,
    fontcolor: String,
    date: {
      type: Date,
      default: Date.now
    }
})

module.exports = CategoriesModel = mongoose.model('Categories', CategoriesSchema);