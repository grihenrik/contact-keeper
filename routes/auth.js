const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const config = require("config");
const auth = require("../middleware/auth");

const User = require("../models/User");

/**
 * @route       POST api/auth
 * @description Login a user
 * @access      Public
 */
router.post(
  "/",
  [
    check("email", "Please input a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (isMatch) {
          const payload = {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              date: user.date,
            },
          };
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              console.log(token);
              return res.json({ token });
            }
          );
        }
      } else res.status(400).json({ msg: "Check user credentials" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);
/**
 * @route       GET api/auth
 * @description Get loggedin user
 * @access      Private
 */
router.get("/", auth, async (req, res) => {
  try {
    //console.log(req.user);
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Not loggedin");
  }
});

module.exports = router;
