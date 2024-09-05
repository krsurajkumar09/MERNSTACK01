const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    // required: true
  },
  emai: {
    type: String,
    // required: true
  },
  image: {
    type: String,
  },
});

const UserModel = mongoose.model("googleauths", UserSchema);
module.exports = UserModel;
