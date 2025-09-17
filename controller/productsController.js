const Product = require('../models/product');
<<<<<<< HEAD
const { v4: uuidv4 } = require('uuid');
const {uploadFile,deleteFile} = require('../config/s3');
const { updateProductSchema } = require('../validators/productValidator');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "At least one file is required"
      });
    }

    // Upload files to S3
    let imageArray = [];
    for (const file of files) {
      const uploaded = await uploadFile(file); // uploadFile helper ka use
      imageArray.push({ url: uploaded.url, key: uploaded.Key });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images: imageArray
    });

    return res.status(201).json({
      success: true,
      msg: "Product Created Successfully",
      product
    });

  } catch (error) {
    console.log("error::", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error"
=======
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
>>>>>>> bc32ebeacccd7e7eed030fd2a282441fec3efdc2
    });
  }
};

<<<<<<< HEAD
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const sortOrder = order === "asc" ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      products,
      msg: "Products Fetched successfully"
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const productDetails = await Product.findById(id).populate('category');
    if (!productDetails) {
      return res.status(200).json({
        success: false,
        msg: "Product details not found"
      })
    }

    return res.status(200).json({
      success: true,
      msg: "Product details fetched successfully",
      data: productDetails
    })
  } catch (error) {
    console.log("error::", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error"
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(200).json({ success: false, msg: "Product not found" });

    for (let img of product.images) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: img.key,
      };
      await s3.deleteObject(params).promise();
    }

    await product.deleteOne();

    return res.status(200).json({ success: false, msg: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updateProductSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, msg: "Product not found" });

    let newImageUrls = product.images;

    if (req.files && req.files.length > 0) {
      if (product.images && product.images.length > 0) {
        for (const oldImage of product.images) {
          const key = oldImage.split("/").pop();
          await deleteFile(key);
        }
      }

      newImageUrls = [];
      for (const file of req.files) {
        const result = await uploadFile(file);
        newImageUrls.push(result.Location);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: { ...value, images: newImageUrls } },
      { new: true }
    );

    return res.json({
      success: true,
      msg: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
=======



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
>>>>>>> bc32ebeacccd7e7eed030fd2a282441fec3efdc2
