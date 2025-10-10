// use this code while using cookies
const express = require('express');
const router = express.Router();

// In-memory token blacklist (for example, replace with DB if needed)
const tokenBlacklist = new Set();

router.post('/logout', (req, res) => {
  try {
    // Clear JWT token cookie if used
    res.clearCookie('token');

    // Blacklist token from cookie or header to invalidate it
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (token) {
      tokenBlacklist.add(token);
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
});


module.exports = router;
