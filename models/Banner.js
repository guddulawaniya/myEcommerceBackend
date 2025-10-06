const mongoose = require('mongoose'); 

const bannerSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  status: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);