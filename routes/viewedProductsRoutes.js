// routes/recentlyViewed.js
const express = require('express');
const router = express.Router();
const RecentlyViewed = require('../models/RecentlyViewed');

// Add or update a viewed product
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  let record = await RecentlyViewed.findOne({ userId });
  if (!record) {
    record = new RecentlyViewed({ userId, products: [] });
  }

  // Remove if product exists to update viewedAt
  record.products = record.products.filter(p => p.productId.toString() !== productId);
  // Add it to front
  record.products.unshift({ productId, viewedAt: new Date() });
  // Keep max 10 items
  if (record.products.length > 10) {
    record.products.pop();
  }

  await record.save();
  res.status(200).json(record);
});

// Get recently viewed products
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const record = await RecentlyViewed.findOne({ userId }).populate('products.productId');
  if (!record) return res.json([]);
  res.json(record.products.map(p => p.productId));
});

module.exports = router;
