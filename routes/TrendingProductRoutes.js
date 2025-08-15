// routes/treadingRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const treadingController = require('../controller/treadingController');
const uploadProduct = createUpload("TrendingProducts");


// Create Treading Product
router.post('/',upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  treadingController.createTreadingProduct
);

// Get all Treading Products
router.get('/', treadingController.getAllTreadingProducts);

// Get single Treading Product by ID
router.get('/:id', treadingController.getTreadingProductById);

// Update Treading Product
router.put('/:id',upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  treadingController.updateTreadingProduct
);

// Delete Treading Product
router.delete('/:id', treadingController.deleteTreadingProduct);

module.exports = router;
