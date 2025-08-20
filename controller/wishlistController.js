const Wishlist = require("../models/wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");
    res.json(wishlist || { user: req.user.id, products: [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user.id, products: [productId] });
    else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: productId } },
      { new: true }
    );
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
