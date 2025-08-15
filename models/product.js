const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }] ,
  sold_count: { type: Number, default: 0 },     // track sales
  likes: { type: Number, default: 0 },          // track likes
  avg_rating: { type: Number, default: 0 },     // track ratings
  trending_score: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
