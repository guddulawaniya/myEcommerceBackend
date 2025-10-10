const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware')

// Register or complete registration (for first login)
router.post('/register', userController.registerUser); // registration form submission

// Get user profile (protected)
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile (protected)
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Optionally: Fetch all users (admin only, add role check to middleware)
//router.get('/', authMiddleware, userController.getAllUsers);

// Example logout endpoint (handle on frontend by removing token)
router.post('/logout', (req, res) => {
  // Can be empty if just handling on frontend
  res.json({ success: true });
});

module.exports = router;
