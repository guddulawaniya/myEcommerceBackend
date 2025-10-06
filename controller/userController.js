// controllers/userController.js
const User = require('../models/User');

exports.updateUserProfile = async (req, res) => {
  const userId = req.user.id; // Assume user info is in req.user after auth middleware
  const allowedUpdates = ['name', 'email', 'address', 'phone'];
  const updates = {};
  allowedUpdates.forEach(f => {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  });

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};
