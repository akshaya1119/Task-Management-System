
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors")
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
const notification = require("./routes/notificationRoute")
const tickettype = require("./routes/tickettypeRoute")


app.use(cors({
  origin: '*',
  methods:['GET','POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}))

app.use("/api/users", user);
app.use("/api/ticket", ticket);
app.use("/api/project", project);
app.use("/api/comment", comment);
app.use("/api/role", role);
app.use("/api/department", department);
app.use("/api/designation", designation);
app.use("/api/notification", notification);
app.use("/api/tickettype", tickettype);


//app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;