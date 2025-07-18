const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [50, "Name cannot exceed 50 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    department: {
        type: String,
        required: [true, "Please Enter department"],
    },
    role: {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
        required: true,
    },
    mobileNo: {
        type: String,
        required: [true, "Please Enter MobileNo"],
        minLength: [10, "MobileNo should have at least 10 characters"],
        maxLength: [10, "MobileNo should be not more than 10 characters"],
    },
    address: {
        type: String,
        required: [true, "Please Enter Address"],
    },
    profilepicture: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
    },
    resetPasswodToken: String,
    resetPasswordExpire: Date,
})

// This is done in order to encrypt the password and save in db
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// This is done in order to generate jwt web tokens

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
// Generating pasword when forget

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    //basically neeche ki line ye kh rhi ki tmhe kya update kena h which is token and hex is used for making it readable
    this.resetPasswodToken = crypto.createHash("sha256").update(token).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

// Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("User", userSchema);