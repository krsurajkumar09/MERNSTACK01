const express = require("express");
const app = express();
require("dotenv").config();
require("./models/dbConnection.js");
const authRouter = require("./routes/authRouter.js");
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
