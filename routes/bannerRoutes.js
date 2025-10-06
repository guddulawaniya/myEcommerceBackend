const express = require('express');
const path = require('path');
const bannerController = require('../controller/bannerController');

const router = express.Router();

const { createUpload } = require("../middlewares/uploads");

const uploadBanner = createUpload("banners");

// Routes
router.post('/', uploadBanner.single('image'), bannerController.createBanner);
router.get('/', bannerController.getBanners);
router.get('/:id', bannerController.getBannerById);
router.put('/:id', uploadBanner.single('image'), bannerController.updateBanner);
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;
