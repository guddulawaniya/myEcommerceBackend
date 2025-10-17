// controllers/userController.js
const User = require('../models/User');

// Register or Complete Registration (first login)
exports.registerUser = async (req, res) => {
  try {
    // These fields are expected from the registration form
    const { firstName, lastName, email, contact, avatar, gender } = req.body;

    // Find by contact
    let user = await User.findOne({ contact });

    if (!user) {
      // Create if user not present
      user = await User.create({
        firstName,
        lastName,
        email,
        contact,
        avatar,
        gender,
        isFirstLogin: false
      });
    } else {
      // Update profile and mark registration complete
      Object.assign(user, {
        firstName,
        lastName,
        email,
        avatar,
        gender,
        isFirstLogin: false
      });
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
    const user = await User.findById(userId)
      .select('-password -otp -otpExpires');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
};

// Update User Profile (protected)
exports.updateUserProfile = async (req, res) => {
  const userId = req.user.id; // populated by auth middleware
  const allowedUpdates = ['firstName', 'lastName', 'email', 'contact', 'avatar', 'gender'];
  const updates = {};

  // Build updates object
  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined && !(field === 'gender' && !req.body[field])) {
      updates[field] = req.body[field];
    }
  });

  // Ensure isFirstLogin is false after update
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

// deactivate user

exports.deactivateUser = async (req, res) => {
  try {
    const userId = req.user.id; // Auth middleware sets this
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { isActive: false } }, // You can use status: "deactivated" instead
      { new: true }
    ).select('-password -otp -otpExpires');
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to deactivate account", details: error.message });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete account", details: error.message });
  }
};

