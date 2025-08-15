const Category = require("../models/Category");
const path = require("path");
const fs = require("fs");

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { category_name, status } = req.body;

   let imageName = "";
    if (req.file) { // ✅ Single file upload
      const prefix = "category-";
      const ext = path.extname(req.file.originalname);
      const newFileName = `${prefix}${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      const newPath = path.join(req.file.destination, newFileName);

      fs.renameSync(req.file.path, newPath);
      imageName = newFileName;
    }

    const category = new Category({
      category_name,
      status,
      image: imageName
    });

    await category.save();
    res.status(201).json({status : true, message: "Category created successfully", category });

  } catch (error) {
    res.status(500).json({status : false, message: "Server error", error });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get single category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { category_name, status } = req.body;

    let updateData = { category_name, status };

    if (req.files && req.files.length > 0) {
      const prefix = "category-";
      const imageNames = req.files.map(file => {
        const ext = path.extname(file.originalname);
        const newFileName = `${prefix}${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        const newPath = path.join(file.destination, newFileName);
        fs.renameSync(file.path, newPath);
        return newFileName;
      });
      updateData.image = imageNames;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully", category });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
