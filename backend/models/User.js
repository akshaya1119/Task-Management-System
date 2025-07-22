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
    department: {
        type: mongoose.Schema.ObjectId,
        ref: "Department",
    },
    role: {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
    },
    mobileNo: {
        type: String,
        minLength: [10, "MobileNo should have at least 10 characters"],
        maxLength: [10, "MobileNo should be not more than 10 characters"],
    },
    address: {
        type: String,
    },
    profilepicture: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
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



// Compare Password


module.exports = mongoose.model("User", userSchema);