const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.js");

// Signup functionality
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User is already registered! LogIn with your ID",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "SignUp successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

// Sign In functionality
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";

    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const isPassEqual = await bycrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // JWT Token

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "SignUp successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

// exporting functions
module.exports = { signup, login };
