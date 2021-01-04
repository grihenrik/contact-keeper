const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  // console.log(req.header("Authorization").split(" ")[1]);

  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ msg: "Invalid credentials" });
  }
};
