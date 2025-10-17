const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      //required: true
    },
    lastName: {
      type: String,
      trim: true,
      //required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      //required: true
    },
    contact: {
      type: String,
      unique: true,
      sparse: true, // Allows optional contact
      trim: true
    },
    password: {
      type: String,
      minlength: 4 // Optional for OTP login
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user"
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp"
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
      trim: true
    },
    otp: {
      type: String
    },
    otpExpires: {
      type: Date
    },
    // Indicates if registration is not completed, used for first login logic
    isFirstLogin: {
      type: Boolean,
      default: true
    },
    isActive: {
    type: Boolean,
    default: true,
    required: true
  }
  },
  { timestamps: true }
);

module.exports = mongoose.models.user || mongoose.model("user", userSchema);
