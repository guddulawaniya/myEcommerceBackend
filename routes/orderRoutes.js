const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authenticateJWT = require('../middleware/auth');

// Get all orders for user
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order details
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel order
router.post('/:id/cancel', authenticateJWT, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.status === 'Cancelled') {
      return res.status(400).json({ error: 'Order already cancelled' });
    }

    order.status = 'Cancelled';
    order.updatedAt = Date.now();
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Track order (dummy implementation)
router.get('/:id/track', authenticateJWT, async (req, res) => {
  // In production, integrate with shipment API here.
  res.json({ status: 'In Transit', progress: 70, eta: '2 days' });
});

module.exports = router;
