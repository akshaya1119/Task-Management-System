const mongoose = require("mongoose");
const bcrypto = require("bcryptjs");
const crypto = require("crypto");

const UserAuthSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    Password: {
        type: String,
        required: [true, "Please Enter your password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    AutogenPass: {
        type: Boolean,
        default: false
    },
    PasswordResetToken: String,      // Field to store reset token
    PasswordResetExpire: Date,
})

// Hash the password before saving
UserAuthSchema.pre("save", async function (next) {
    if (!this.isModified("Password"))
        return next();
    this.Password = await bcrypto.hash(this.Password, 10);
    next();
})

UserAuthSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypto.compare(enteredPassword, this.Password)
}

UserAuthSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    //basically neeche ki line ye kh rhi ki tmhe kya update kena h which is token and hex is used for making it readable
    this.PasswordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.PasswordResetExpire = Date.now() + 60 * 60 * 1000;
    return resetToken;
}



module.exports = mongoose.model("UserAuth", UserAuthSchema)