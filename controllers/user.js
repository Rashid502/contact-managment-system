const asyncHandler = require("../middleware/async");
const {
  check,
  validationResult
} = require("express-validator/check");
const User = require("../models/User");

//@desc     Create new user
//@route    POST /api/v1/user
//@access   Private
exports.createUser = (
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
      res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      msg: "Data validated",
    });
  }
);

//@desc     Get User
//@route    GET /api/v1/user
//@access   public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

//@desc     Update user
//@route    PUT /api/v1/user/:id
//@access   public
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(400).json({
      success: false,
    });
  }
  res.status(201).json({
    success: true,
    data: user,
  });
});

//@desc     Delete User
//@route    DELETE /api/v1/user/:id
//@access   private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({
      success: false,
    });
  }
  user.remove();
  res.status(201).json({
    success: true,
    data: {},
  });
});