const Banner = require('../models/Banner');
const path = require('path');
const fs = require('fs');


exports.createBanner = async (req, res) => {
  try {
    const { status } = req.body;

    if (!req.file) {
      return res.status(400).json({ status: false, message: "Please upload a banner image" });
    }

    // If you are using Multer, it already gives a unique filename
    const imageName = req.file.filename;

    const newBanner = new Banner({
      banner: imageName,
      status: status ?? true // default true if not provided
    });

    await newBanner.save();

    res.status(201).json({
      status: true,
      message: "Banner created successfully",
      banner: newBanner // fixed: return the created banner, not 'category'
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message
    });
  }
};

// // Create banner
// exports.createBanner = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Please upload a banner image" });
//     }

//     const newBanner = new Banner({
//       banner: req.file.filename, // Multer already named it
//       status: req.body.status 
//     });

//     await newBanner.save();

//     res.status(201).json({
//         status:true,
//       message: "Banner created successfully",
//       banner: newBanner
//     });
//   } catch (error) {
//     res.status(500).json({ status:false,message: "Server error", error: error.message });
//   }
// };


// Get all banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get single banner
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update banner
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    if (req.file) {
      const prefix = "banner-";
      const ext = path.extname(req.file.originalname);
      const newFileName = `${prefix}${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      const newPath = path.join(req.file.destination, newFileName);
      fs.renameSync(req.file.path, newPath);

      // Delete old file if exists
      const oldPath = path.join(req.file.destination, banner.banner);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      banner.banner = newFileName;
    }

    if (req.body.status !== undefined) {
      banner.status = req.body.status;
    }

    await banner.save();
    res.status(200).json({ message: "Banner updated successfully", banner });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    // Delete image file
    const filePath = path.join(__dirname, '../../uploads/banners', banner.banner);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
