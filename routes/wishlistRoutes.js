const express = require("express");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controller/wishlistController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getWishlist);
router.post("/add", authMiddleware, addToWishlist);
router.post("/remove", authMiddleware, removeFromWishlist);

module.exports = router;
