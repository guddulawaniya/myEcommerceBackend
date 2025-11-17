const express = require("express");
const router = express.Router();
const Address = require("../models/address");
const auth = require("../middlewares/authMiddleware");

// Create / Add Address
router.post("/", auth, async (req, res) => {
  try {
    const body = req.body;

    // If a new default address is added, unset old default
    if (body.isDefault) {
      await Address.updateMany(
        { user: req.user.id, isDefault: true },
        { $set: { isDefault: false } }
      );
    }

    const address = await Address.create({
      user: req.user.id,
      ...body
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all addresses for a user
router.get("/", auth, async (req, res) => {
  const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1 });
  res.json(addresses);
});

// Update address
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete address
router.delete("/:id", auth, async (req, res) => {
  try {
    await Address.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Address removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
