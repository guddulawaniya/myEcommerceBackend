const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  sendOtp,
  verifyOtp,
} = require('../controller/authController');

// Controller function to get current logged in user info from req.user
const getCurrentUser = (req, res) => {
  res.json(req.user);
};

// Public route to send OTP
router.post('/send-otp', sendOtp);

// Public route to verify OTP and get JWT token
router.post('/verify-otp', verifyOtp);

// Protected route to get current authenticated user's info
router.get('/me', auth, getCurrentUser);

module.exports = router;
