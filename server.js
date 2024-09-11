const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const CarModel = require("./models/car");
const userModel = require("./models/user");
const session = require("express-session");
const passUserToView = require("./middleware/pass-user-to-view.js");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", function () {
  console.log(`Connected to DB ${mongoose.connection.name}`);
});

const carController = require("./controllers/car");
const authController = require("./controllers/auth");

//Midleware start
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitalized: true,
  })
);
app.use(passUserToView);
// Middleware end

// Landing page start
app.get("/", function (req, res) {
  res.render("index.ejs");
});
// Landing page end
app.use("/cars", carController);
app.use("/auth", authController);
// Port the server listens on
app.listen(3000, function () {
  console.log("Server is listening for a response on port 3000.");
});
