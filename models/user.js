

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      unique: true,
      sparse: true, // Allows for optional contact
      trim: true,
    },
    password: { type: String, minlength: 4 }, // Optional for OTP login
    role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },

    otp: { type: String },
    otpExpires: { type: Date },

    // Indicates if registration is not completed, used for first login logic
    isFirstLogin: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);

//module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.models.user || mongoose.model("user", userSchema);

