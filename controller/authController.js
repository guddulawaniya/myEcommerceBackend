const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.sendOtp = async (req, res) => {
  try {
    const { contact } = req.body;
    if (!contact) return res.status(400).json({ error: "Phone number required" });

    let user = await User.findOne({ contact });
    if (!user) {
      user = await User.create({ contact });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    console.log("otp while sending  ",otp);

    return res.json({ message: "OTP sent", otp });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { contact, otp } = req.body;
    const user = await User.findOne({ contact });

    if (!user) return res.status(404).json({ error: "User not found" });

    const storedOtp = String(user.otp).trim();
    const receivedOtp = String(otp).trim();

    if (storedOtp !== receivedOtp || Date.now() > user.otpExpires) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Determine first login by missing info (use both names and email)
    const isFirstLogin = !user.firstName || !user.lastName || !user.email;

    // If user has completed registration, update flag in DB
    if (user.isFirstLogin && !isFirstLogin) {
      user.isFirstLogin = false;
      await user.save();
    }

    const tokenPayload = {
      id: user._id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      contact: user.contact || "",
      gender: user.gender || "",
      avatar: user.avatar || "",
      role: user.role || "",
      isFirstLogin: user.isFirstLogin
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Debug log the outgoing response!
    console.log("OTP verify response:", {
      success: true,
      message: "Login successful",
      token,
      isFirstLogin: user.isFirstLogin,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contact: user.contact,
        gender: user.gender,
        avatar: user.avatar,
        role: user.role
      }
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      isFirstLogin: user.isFirstLogin,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contact: user.contact,
        gender: user.gender,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (err) {
    console.error("OTP verify error:", err);
    return res.status(500).json({ error: err.message });
  }
};
