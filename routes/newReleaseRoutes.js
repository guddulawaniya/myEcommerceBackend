// routes/newReleases.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // assuming your model name

// GET /api/new-releases
router.get('/', async (req, res) => {
  try {
    // Query for latest products: e.g., those added in the last 30 days or with an isNew flag
    // Customize your query as needed (date, flag, etc.)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newReleases = await Product.find({
      // Example criteria: added in last 30 days OR marked isNew
      $or: [
        { createdAt: { $gte: thirtyDaysAgo } },
        { isNew: true }
      ]
    }).sort({ releaseDate: -1 }); // newest first

    res.json(newReleases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
