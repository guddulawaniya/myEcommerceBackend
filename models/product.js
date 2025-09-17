<<<<<<< HEAD
const mongoose = require("mongoose");
=======
const mongoose = require('mongoose');
>>>>>>> bc32ebeacccd7e7eed030fd2a282441fec3efdc2

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
<<<<<<< HEAD
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  stock: { type: Number, default: 0 },
  images: [
    {
      url: String,
      key: String,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);


// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true }, // Base price (used if no variant)
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
//   stock: { type: Number, default: 0 }, // total stock (optional)
//   images: [
//     {
//       url: String,
//       key: String,
//     }
//   ],
//   variants: [
//     {
//       size: { type: String, required: true },
//       color: { type: String, required: true },
//       price: { type: Number, required: true },
//       stock: { type: Number, default: 0 },
//       sku: { type: String },
//       isDefault: { type: Boolean, default: false },
//       images: [
//         {
//           url: String,
//           key: String,
//         }
//       ],
//     }
//   ],
//   defaultVariant: { type: mongoose.Schema.Types.ObjectId }, // store selected variant _id
// }, { timestamps: true });

// module.exports = mongoose.model("Product", productSchema);
=======
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }] ,
  sold_count: { type: Number, default: 0 },     // track sales
  likes: { type: Number, default: 0 },          // track likes
  avg_rating: { type: Number, default: 0 },     // track ratings
  trending_score: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
>>>>>>> bc32ebeacccd7e7eed030fd2a282441fec3efdc2
