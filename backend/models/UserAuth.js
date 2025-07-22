const mongoose = require("mongoose");

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
    },
    AutogenPass: {
        type: Boolean,
        default: false
    },
    PasswordResetToken: String,      // Field to store reset token
    PasswordResetExpire: Date,
})

UserAuthSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    //basically neeche ki line ye kh rhi ki tmhe kya update kena h which is token and hex is used for making it readable
    this.PasswordResetToken = crypto.createHash("sha256").update(token).digest("hex");
    this.PasswordResetExpire = Date.now() + 60 * 60 * 1000;
    return resetToken;
}

UserAuthSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

mongoose.exports = mongoose.model("UserAuth", UserAuthSchema)