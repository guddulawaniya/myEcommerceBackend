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

module.exports = router;
