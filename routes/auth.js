const express = require("express");
const {check, validationResult} = require("express-validator/check");
const User = require("../models/User");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

//@desc     Get User
//@route    Get /api/auth
//@access   private
router.get("/auth", auth, async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      msg: "Server Error",
    });
  }
});

//@desc     Login User
//@route    POST /api/auth
//@access   Public
router.post(
  "/auth",
  [
    check("email", "Email is required.").isEmail(),
    check("password", "Please enter Password.").isLength({
      min: 5,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    try {
      let {email, password} = req.body;

      let user = await User.findOne({
        email,
      });
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "Invalid Credentials.",
        });
      }

      let isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          msg: "Invalid Credentials.",
        });
      }

      const payload = {
        user: user._id,
      };
      jwt.sign(
        payload,
        "mySecret",
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.status(200).send(token);
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

module.exports = router;
