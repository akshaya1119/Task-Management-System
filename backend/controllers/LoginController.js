const catchAsyncError = require("../middleware/catchAsyncError");
const Auth = require("../models/UserAuth")
const User = require("../models/User")
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorhandler");
const bycrypt = require("bcryptjs")


exports.ChangePassword = catchAsyncError(async (req, res, next) => {
    const userid = await Auth.findById(req.params.id).select("+Password");
    const isPasswordMatched = await userid.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    Auth.Password = hashedNewPassword;
    await Auth.save();

})

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    const userAuth = await Auth.findOne({ UserId: user._id });

    if (!userAuth) {
        return next(new ErrorHandler("User authentication details not found", 404));
    }
    // Get ResetPassword Token
    const resetToken = userAuth.getResetPasswordToken();

    await userAuth.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        userAuth.PasswordResetToken = undefined;
        userAuth.PasswordResetExpire = undefined;

        await userAuth.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});


exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const userAuth = await Auth.findOne({
        PasswordResetToken: resetPasswordToken,
        PasswordResetExpire: { $gt: Date.now() },
    });

    if (!userAuth) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    userAuth.Password = await bcrypt.hash(req.body.password, 10);

    // Clear the reset token and expiration
    userAuth.PasswordResetToken = undefined;
    userAuth.PasswordResetExpire = undefined;


    await userAuth.save();

    res.status(200).json({
        success: true,
        message: "Password reset successfully.",
    });
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});



exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const userAuth = await Auth.findOne({ UserId: user._id }).select("+Password")
    if (!userAuth) {
        return next(new ErrorHandler("Authentication details not found", 401));
    }
    const isPasswordMatched = await userAuth.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, userAuth.AutogenPass, 200, res);
});