const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema({
    Designation: {
        type: String,
        required: [true, "Enter Designation"]
    }
})

module.exports = mongoose.model("Designation", DesignationSchema)