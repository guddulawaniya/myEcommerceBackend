const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticateToken = require('../middlewares/authMiddleware');

router.patch('/update', authenticateToken, async (req, res) => {
  try {
    const allowedFields = ['name', 'contact'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
