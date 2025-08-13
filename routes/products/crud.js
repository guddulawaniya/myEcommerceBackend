const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploads');
const productController = require('../../controller/products/crud');
const path = require('path');

// Serve uploaded images statically
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
router.post('/upload', upload.array('images', 5), productController.uploadProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

module.exports = router;
