import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/Users.js";

// Initializing the express
const app = express();

// Middlewares
app.use(cors()); // Call cors as a function
app.use(express.json());

// Connecting with mongoose database locally
mongoose
  .connect("mongodb://localhost:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// GET endpoint to fetch users
app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// GET endpoint to fetch a single user by ID
app.get("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

// PUT endpoint to update an existing user by ID
app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { Name, Email, Age } = req.body;

    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = Name;
    user.email = Email;
    user.age = Age;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

// POST endpoint to add the new record
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
    res.status(400).json({
      error: "An error occurred while creating the user",
      details: err,
    });
  }
});

// DELETE endpoint to delete a user by ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
