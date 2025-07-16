const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// Route Imports
const user = require("./routes/userRoute");
const ticket = require("./routes/ticketRoute")
const project = require("./routes/projectRoute")
const comment = require("./routes/commentRoute")
const role = require("./routes/roleRoute")
const department = require("./routes/departmentRoute")
const designation = require("./routes/designationRoute")
const tickettype = require("./routes/tickettypeRoute")

app.use("/api/v1", user);
app.use("/api/v1", ticket);
app.use("/api/v1", project);
app.use("/api/v1", comment);
app.use("/api/v1", role);
app.use("/api/v1", department);
app.use("/api/v1", designation);
app.use("/api/v1", department);
app.use("/api/v1", tickettype);


app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;