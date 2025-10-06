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
    contact: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: { type: String, minlength: 4 },
    role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },

    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
