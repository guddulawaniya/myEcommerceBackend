const Product = require('../models/product');
const Category = require('../models/Category');
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

exports.uploadProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    let categoryDoc;

    // Check if category is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(category)) {
      categoryDoc = await Category.findById(category);
    }

    // If not found by ID, try finding by name
    if (!categoryDoc) {
      categoryDoc = await Category.findOne({ name: category });
    }

    if (!categoryDoc) {
      return res.status(400).json({
        status: false,
        message: "Invalid category"
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please upload at least one image"
      });
    }

    const prefix = "product-";

    const imageNames = req.files.map(file => {
      const ext = path.extname(file.originalname);
      const newFileName = `${prefix}${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      const newPath = path.join(file.destination, newFileName);

      fs.renameSync(file.path, newPath);

      return newFileName;
    });

    const newProduct = new Product({
      name,
      description,
      price,
      category: categoryDoc._id, // Save ObjectId
      images: imageNames
    });

    await newProduct.save();

    res.status(201).json({
      status: true,
      message: "Product uploaded successfully",
      product: newProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message
    });
  }
};




// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
