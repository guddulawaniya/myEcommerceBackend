const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controller/cartController");

router.post("/add", auth, addToCart);
router.get("/",auth , getCart);
router.delete("/remove", auth, removeFromCart);
router.get('/test', (req, res) => res.json({ working: true }));


module.exports = router;
