const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
} = require("../controller/productsController");
const authMiddleware = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploads");
const validateRequest = require("../middlewares/validateRequest");
const { productValidationSchema } = require("../validators/productValidator");

const router = express.Router();

router.post("/products", upload.array("images", 5),validateRequest(productValidationSchema), createProduct);
router.put("/products/:id",authMiddleware, upload.array("images", 5), updateProduct);
router.delete("/products/:id",authMiddleware, deleteProduct);
router.get("/products/:id", getProductById);
router.get("/products", getProducts); //,authMiddleware

module.exports = router;
