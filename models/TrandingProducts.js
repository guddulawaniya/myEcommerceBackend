const mongoose = require('mongoose');

const treadingSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  main_image: { type: String },
  discount: { type: Number },
  is_like: { type: Number },
  avg_rating: { type: String },
  total_rating: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }] 
}, { timestamps: true });

module.exports = mongoose.model('TreadingProduct', treadingSchema);
