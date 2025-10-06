const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    price: Number,
    image: String,
  },
  quantity: { type: Number, default: 1 },
  status: { 
    type: String, 
    enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Placed' 
  },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
