const Wishlist = require("../models/wishlist");
const mongoose = require("mongoose");

// ------------------------- GET WISHLIST -------------------------
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate("products");

    return res.json({
      products: wishlist?.products || []
    });
  } catch (err) {
    console.error("GET Wishlist Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------------- ADD TO WISHLIST -------------------------
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Valid productId is required" });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [productId]
      });
    } else {
      await Wishlist.updateOne(
        { user: req.user.id },
        { $addToSet: { products: productId } }  // prevents duplicates
      );
    }

    const updated = await Wishlist.findOne({ user: req.user.id })
      .populate("products");

    return res.json({
      message: "Product added to wishlist",
      products: updated.products
    });

  } catch (err) {
    console.error("ADD Wishlist Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------------- REMOVE FROM WISHLIST -------------------------
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Valid productId is required" });
    }

    await Wishlist.updateOne(
      { user: req.user.id },
      { $pull: { products: productId } }   // removes product
    );

    const updated = await Wishlist.findOne({ user: req.user.id })
      .populate("products");

    return res.json({
      message: "Product removed from wishlist",
      products: updated?.products || []
    });

  } catch (err) {
    console.error("REMOVE Wishlist Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
