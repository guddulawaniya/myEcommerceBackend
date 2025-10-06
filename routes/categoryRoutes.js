const express = require("express");
const path = require("path");
const categoryController = require("../controller/categoryController");

const router = express.Router();

const { createUpload } = require("../middlewares/uploads");

const uploadCategory = createUpload("category");


// Routes
router.post("/", uploadCategory.single("image"), categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", uploadCategory.single("image"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
