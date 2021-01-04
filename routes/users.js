const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const config = require("config");

const User = require("../models/User");

/**
 * @Route POST api/users
 * @desc Register a user
 * @access Public
 */
router.post(
  "/",
  [
    check("name", "Name is required").isLength({ min: 2 }).trim().escape(),
    check("email", "Not a valid email").isEmail().normalizeEmail(),
    check(
      "password",
      "Password lenght must be more than 8 characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      const { id, date } = await user.save();
      const payload = {
        user: {
          id: id,
          name: name,
          email: email,
          date: date,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
