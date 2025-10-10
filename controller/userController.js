// controllers/userController.js
const User = require('../models/User');

// Register or Complete Registration (first login)
exports.registerUser = async (req, res) => {
  try {
    // These fields are expected from the registration form
    const { name, email, contact, avatar } = req.body;

    // Find by contact, update profile and isFirstLogin
    let user = await User.findOne({ contact });

    if (!user) {
      // Create if user not present (optional: for pure registration)
      user = await User.create({
        name,
        email,
        contact,
        avatar,
        isFirstLogin: false,
      });
    } else {
      // Update user profile and mark registration complete
      user.name = name;
      user.email = email;
      user.avatar = avatar;
      user.isFirstLogin = false;
      await user.save();
    }

    // Exclude sensitive fields
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.otp;
    delete userObj.otpExpires;

    res.json({ success: true, user: userObj });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

// Get User Profile (protected)
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password -otp -otpExpires');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
};

// Update User Profile (protected)
exports.updateUserProfile = async (req, res) => {
  const userId = req.user.id; // populated by auth middleware
  const allowedUpdates = ['name', 'email', 'contact', 'address', 'avatar'];
  const updates = {};

  allowedUpdates.forEach(f => {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  });

  // Ensure isFirstLogin is set to false after profile registration/update
  updates.isFirstLogin = false;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -otp -otpExpires');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: 'Update failed', details: err.message });
  }
};
