const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, reviewController.addReview);

router.get("/:productId", reviewController.getProductReviews);

router.put("/:reviewId", auth, reviewController.updateReview);

router.delete("/:reviewId", auth, reviewController.deleteReview);

module.exports = router;