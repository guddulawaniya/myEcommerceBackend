const TreadingProduct = require('../models/TreadingProduct');
const Category = require('../models/Category');
const path = require('path');
const fs = require('fs');

// Create Treading Product
exports.createTreadingProduct = async (req, res) => {
  try {
    const { product_name, price, discount, is_like, avg_rating, total_rating, category } = req.body;

    // Check if category exists
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({ status: false, message: "Invalid category ID" });
    }


    // Handle images
    let mainImage = "";
    if (req.files && req.files.main_image) {
      const file = req.files.main_image[0];
      const ext = path.extname(file.originalname);
      const fileName = `treading-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      const newPath = path.join(file.destination, fileName);
      fs.renameSync(file.path, newPath);
      mainImage = fileName;
    }

    let images = [];
    
    if (req.files && req.files.images) {
      images = req.files.images.map(file => {
        const ext = path.extname(file.originalname);
        const fileName = `treading-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        const newPath = path.join(file.destination, fileName);
        fs.renameSync(file.path, newPath);
        return fileName;
      });
    }

    const newProduct = new TreadingProduct({
      product_name,
      price,
      discount,
      is_like,
      avg_rating,
      total_rating,
      category,
      main_image: mainImage,
      images
    });

    await newProduct.save();
    res.status(201).json({ status: true, message: "Treading product created successfully", product: newProduct });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};

// Get all Treading Products
exports.getAllTreadingProducts = async (req, res) => {
  try {
    const products = await TreadingProduct.find().populate('category');
    res.status(200).json({ status: true, products });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};

// Get single Treading Product
exports.getTreadingProductById = async (req, res) => {
  try {
    const product = await TreadingProduct.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ status: false, message: "Product not found" });
    res.status(200).json({ status: true, product });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};

// Update Treading Product
exports.updateTreadingProduct = async (req, res) => {
  try {
    const product = await TreadingProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ status: false, message: "Product not found" });

    const { product_name, price, discount, is_like, avg_rating, total_rating, category } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) return res.status(400).json({ status: false, message: "Invalid category ID" });
      product.category = category;
    }

    if (product_name) product.product_name = product_name;
    if (price) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (is_like !== undefined) product.is_like = is_like;
    if (avg_rating) product.avg_rating = avg_rating;
    if (total_rating) product.total_rating = total_rating;

    // Update main image
    if (req.files && req.files.main_image) {
      const file = req.files.main_image[0];
      const ext = path.extname(file.originalname);
      const fileName = `treading-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      const newPath = path.join(file.destination, fileName);
      fs.renameSync(file.path, newPath);

      // Delete old main image
      if (product.main_image) {
        const oldPath = path.join(file.destination, product.main_image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      product.main_image = fileName;
    }

    // Update images
    if (req.files && req.files.images) {
      const newImages = req.files.images.map(file => {
        const ext = path.extname(file.originalname);
        const fileName = `treading-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        const newPath = path.join(file.destination, fileName);
        fs.renameSync(file.path, newPath);
        return fileName;
      });
      product.images = newImages;
    }

    await product.save();
    res.status(200).json({ status: true, message: "Product updated successfully", product });

  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};

// Delete Treading Product
exports.deleteTreadingProduct = async (req, res) => {
  try {
    const product = await TreadingProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ status: false, message: "Product not found" });

    // Delete images
    if (product.main_image) {
      const mainPath = path.join(__dirname, '../../uploads/treading', product.main_image);
      if (fs.existsSync(mainPath)) fs.unlinkSync(mainPath);
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        const imgPath = path.join(__dirname, '../../uploads/treading', img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    await TreadingProduct.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};
