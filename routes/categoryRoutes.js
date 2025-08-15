const express = require("express");
const path = require("path");
const categoryController = require("../controller/categoryController");
const createUpload = require("../middlewares/uploads"); // Import the function

const router = express.Router();

// Create upload middleware for category folder
const uploadCategory = createUpload("category");

// Routes
router.post("/", uploadCategory.single("image"), categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", uploadCategory.single("image"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
