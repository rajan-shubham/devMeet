const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the cokkies
    const { tokenShubham } = req.cookies;
    if (!tokenShubham) {
      return res.status(401).send("Please Login!");
    }

    // Validate the token
    const decodedObj = await jwt.verify(tokenShubham, process.env.JWT_SECRET);

    // Find the user
    const user = await User.findById(decodedObj._id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };
