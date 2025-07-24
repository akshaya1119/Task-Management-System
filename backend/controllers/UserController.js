const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/User");
const UserAuth = require("../models/UserAuth")
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { fullname, email, department, role, mobileNo,
    address, status
  } = req.body;

  const user = await User.create({
    fullname,
    email,
    department,
    role,
    mobileNo,
    address,
    status
  });


  const plainPassword = crypto.randomBytes(8).toString('hex'); // 16-char random password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const userAuth = await UserAuth.create({
    UserId: user._id,
    password: hashedPassword,
  })
  const message = `
    Hello ${user.fullname},

    Your account has been created successfully.

    Login Credentials:
    Email: ${user.email}
    Password: ${plainPassword}

    Please login and change your password immediately.
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Login Credentials`,
      message,
    })
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  }
  catch (error) {
    return next(new ErrorHandler("Failed to send email", 500));
  }


  sendToken(user, 201, res);
});


// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.uploadProfilePicture = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  if (!req.file) {
    return next(new ErrorHandler('No file uploaded', 400));
  }

  user.profilepicture = `/uploads/profilePictures/${req.file.filename}`;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile picture uploaded successfully',
    profilePicture: user.profilePicture,
  });

})

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
