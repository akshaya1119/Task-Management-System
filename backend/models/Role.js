const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    rolename: {
        type: String,
        required: [true, "Enter Role Name"]
    }
})

module.exports = mongoose.model("Role",roleSchema);