<<<<<<< HEAD
const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
} = require("../controller/productsController");
const authMiddleware = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploads");
const validateRequest = require("../middlewares/validateRequest");
const { productValidationSchema } = require("../validators/productValidator");

const router = express.Router();

router.post("/products", upload.array("images", 5),validateRequest(productValidationSchema), createProduct);
router.put("/products/:id",authMiddleware, upload.array("images", 5), updateProduct);
router.delete("/products/:id",authMiddleware, deleteProduct);
router.get("/products/:id",authMiddleware, getProductById);
router.get("/products",authMiddleware, getProducts);
=======
const express = require('express');
const router = express.Router();
const productController = require('../controller/productsController');
const path = require('path');
const createUpload = require('../middlewares/uploads');
const uploadProduct = createUpload("products");

// Serve uploaded images statically
router.use('/uploads', express.static(path.join(__dirname, '../../uploads/products')));


// Routes
router.post('/', uploadProduct.array('images', 5), productController.uploadProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
>>>>>>> bc32ebeacccd7e7eed030fd2a282441fec3efdc2

module.exports = router;
