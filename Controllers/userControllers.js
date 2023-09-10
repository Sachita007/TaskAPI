const User = require("./../Models/user");
const AppError = require("./../Utils/appError");
const catchAsync = require("./../Utils/catchAsync");
const { promisify } = require("util");
const JWT = require("jsonwebtoken");

//
// Function for generating json web token
const signTocken = (id) => {
  return JWT.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

//
//  User Registration
exports.register = catchAsync(async (req, res, next) => {
  const user = ({ username, email, password, cpassword } = req.body);
  if (!cpassword || !password) {
    return next(
      new AppError("Please provide password or confirm password", 400)
    );
  }
  if (cpassword !== password) {
    return next(new AppError("Passwords did not match", 400));
  }

  const newUser = await User.create(user);
  const token = signTocken(newUser._id);
  res.status(201).json({
    success: "true",
    token: token,
  });
});

//
// User Sign In
exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is not empty
  if (!email || !password) {
    return next(new AppError("Please provide email or password", 401));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select("password");
  if (!user || !(await user.isValidPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = signTocken(user._id);
  res.status(200).json({
    success: "true",
    token: token,
  });
});

//
// Protecting the routes
exports.protect = catchAsync(async (req, res, next) => {
  // Getting Token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  // Verification token
  const decode = await promisify(JWT.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError("The user belong to this token does no longer exists", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});
