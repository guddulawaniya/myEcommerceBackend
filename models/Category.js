const mongoose = require('mongoose'); 

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  status: { type: String },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);