const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

    //console.log('user.otp:', user.otp, typeof user.otp); // From DB
    //console.log('otp from request:', otp, typeof otp);   // From client
    //console.log('user.otpExpires:', user.otpExpires, 'Current:', Date.now());

    const storedOtp = String(user.otp).trim();
    const receivedOtp = String(otp).trim();


    if (!user) return res.status(404).json({ error: "User not found" });
    if (storedOtp !== receivedOtp || Date.now() > user.otpExpires) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ success: true, message: "Login successful", token });
    //return res.json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
