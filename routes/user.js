const express = require("express");
const {check, validationResult} = require("express-validator/check");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {getUser, updateUser, deleteUser} = require("../controllers/user.js");

const router = express.Router();

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
//router.route("/").post(createUser);

//@desc     Create new user
//@route    POST /api/v1/user
//@access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Please enter Password with 5 more characters").isLength({
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
      let {name, email, password} = req.body;

      let user = await User.findOne({email});
      if (user) {
        return res
          .status(400)
          .json({success: false, msg: "User with this email already exist."});
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: user._id,
      };
      jwt.sign(payload, "mySecret", {expiresIn: 36000}, (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).send(token);
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

module.exports = router;
