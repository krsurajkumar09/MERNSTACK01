const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users.js");

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(
  "mongodb+srv://backend:###########@cluster0.0zhceau.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(3001, () => {
  console.log("Server is running");
});


app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users); // Send a 200 OK status with the user data
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching users", details: err });
  }
});


app.post("/createUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserModel(user);

    // Validate the new user instance before saving
    const validationError = newUser.validateSync();
    if (validationError) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: validationError });
    }

    await newUser.save();
    res.status(201).json(newUser); // Send a 201 Created status with the new user data
  } catch (err) {
    res
      .status(400)
      .json({
        error: "An error occurred while creating the user",
        details: err,
      });
  }
});
