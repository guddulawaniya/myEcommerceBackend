const Review = require("../models/review");
const Product = require("../models/product");

// Add
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id; 

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const existing = await Review.findOne({ product: productId, user: userId });
    if (existing) {
      return res.status(400).json({ error: "You already reviewed this product" });
    }

    const review = await Review.create({
      product: productId,
      user: userId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate("user", "name email") // show reviewer details
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findOne({ _id: reviewId, user: req.user.id });
    if (!review) return res.status(404).json({ error: "Review not found" });

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json({ message: "Review updated", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findOneAndDelete({ _id: reviewId, user: req.user.id });
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
