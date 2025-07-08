const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { employee_id, name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      employee_id,
      name,
      email,
      password: hashedPassword,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

router.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP and expiry in DB
  const user = await User.findOneAndUpdate(
    { mobile },
    { otp, otpExpires: Date.now() + 5 * 60 * 1000 }, // 5 mins
    { new: true }
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  // TODO: Integrate SMS API here (e.g., Twilio)
  console.log(`OTP for ${mobile}: ${otp}`);

  res.json({ message: "OTP sent to your mobile number." });
});

router.post("/change-password", async (req, res) => {
  const { mobile, otp, newPassword } = req.body;

  const user = await User.findOne({ mobile });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.otp !== otp || !user.otpExpires || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.password = newPassword; // Remember to hash this
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: "Password changed successfully." });
});

module.exports = router;
