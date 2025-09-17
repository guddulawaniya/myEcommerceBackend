const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: { type: String, minlength: 6 },
    role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },

<<<<<<< HEAD
=======
    // 🔑 OTP fields
>>>>>>> bc32ebeacccd7e7eed030fd2a282441fec3efdc2
    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
