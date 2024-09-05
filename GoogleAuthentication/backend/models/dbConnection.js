const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully!!!");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error: ", err);
  });
