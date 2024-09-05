const UserModel = require("../models/userModel.js");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2client } = require("../utils/googleConfig.js");

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    
    console.log(userRes.data);
    
    const { email, name, picture } = userRes.data;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        name,
        email,
        image: picture,
      });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    // Include the email in the response
    return res.status(200).json({
      message: "Success",
      token,
      user: { _id, name, email, image: picture },
    });
  } catch (error) {
    console.error("Error in googleLogin:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  googleLogin,
};
