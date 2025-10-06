// routes/user.js (Express route example)
const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

router.patch('/update-profile', isAuthenticated, updateUserProfile);

module.exports = router;
