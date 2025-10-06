// middlewares/multer.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Disk Storage (local uploads ke liye)
function createUpload(folderName) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadFolder = path.join(__dirname, `../uploads/${folderName}`);
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
      }
      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(
        null,
        `${folderName}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  };

  return multer({ storage, fileFilter });
}

// Memory Storage (S3 uploads ke liye)
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

// ✅ Dono ko export karo
module.exports = { createUpload, upload };
