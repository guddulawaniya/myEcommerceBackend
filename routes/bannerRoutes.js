const express = require('express');
const path = require('path');
const bannerController = require('../controller/bannerController');
const createUpload = require('../middlewares/uploads'); // Import function

const router = express.Router();

// Create upload middleware for "banners" folder
const uploadBanner = createUpload("banners");

// Routes
router.post('/', uploadBanner.single('image'), bannerController.createBanner);
router.get('/', bannerController.getBanners);
router.get('/:id', bannerController.getBannerById);
router.put('/:id', uploadBanner.single('image'), bannerController.updateBanner);
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;
