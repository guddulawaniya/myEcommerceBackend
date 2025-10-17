// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true, default:0},
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
//   stock: { type: Number, default: 0 },
//   brand: { type: String },
//   images: [
//     {
//       url: String,
//       key: String,
//     }
//   ],
// }, { timestamps: true });

// module.exports = mongoose.model("Product", productSchema);


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  description: { type: String },
  price: { type: Number, required: true }, // Base price (used if no variant)
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  stock: { type: Number, default: 0 }, // total stock (optional)
  brand: { type: String },
  isActive: { type: Boolean, default: true },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  //tags: [String],
  //weight: Number,
  //dimensions: {
  //length: Number,
  //width: Number,
  //height: Number
  //},
discountPrice:{type: Number},
onSale: { type: Boolean, default: false },

  images: [
    {
      url: String,
      key: String,
    }
  ],
  variants: [
    {
      size: { type: String, required: true },
      color: { type: String, required: true },
      //price: { type: Number, required: true },
      stock: { type: Number, default: 0 },
      sku: { type: String },
      isDefault: { type: Boolean, default: false },
      // images: [
      //   {
      //     url: String,
      //     key: String,
      //   }
      // ],
    }
  ],
  defaultVariant: { type: mongoose.Schema.Types.ObjectId }, // store selected variant _id
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
