const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB connected.....");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error: ", err);
  });

// Using tey and catch block to write it

//   const connectDB = async () => {
//     try {
//       await mongoose.connect(mongo_url);
//       console.log("MongoDB connected.....");
//     } catch (err) {
//       console.log("MongoDB Connection Error: ", err);
//     }
//   };
  
//   connectDB();
  