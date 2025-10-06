// routes/deals.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Adjust model as needed

router.get('/', async (req, res) => {
  try {
    // Example query: find all products with a "deal" flag or discount
    const deals = await Product.find({ discount: { $gt: 0 } }); // customize for your schema
    res.json(deals); // send as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
