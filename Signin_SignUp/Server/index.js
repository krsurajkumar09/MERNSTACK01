const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const RegisterModel = require("./models/Register.js");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:5173"], // Update this array with allowed origins
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = "your_jwt_secret"; // Use an environment variable for this

mongoose.connect("mongodb://127.0.0.1:27017/crud", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

app.post("/register", async (req, res) => {
  
  const { name, email, password } = req.body;

  try {
    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json("Email is already registered with an existing account.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new RegisterModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json("Account successfully created, cheers!");
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.status(400).json("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json("Invalid email or password.");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    }); // Set the cookie
    res.status(200).json("Login successful!");
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

app.get("/protected", async (req, res) => {
  const token = req.cookies.token;
  console.log("Received token:", token); // Log the token
  if (!token) {
    return res.status(401).json("No token provided");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded); // Log the decoded token payload
    res.status(200).json("This is protected data");
  } catch (err) {
    console.error("Token verification error:", err); // Log the error
    res.status(401).json("Invalid token");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json("Logout successful!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
