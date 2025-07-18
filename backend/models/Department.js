const { default: mongoose } = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    DepartmentName: {
        type: String,
        required: [true, "Enter Department Name"],
    }
})

module.exports = mongoose.model("Department", DepartmentSchema)