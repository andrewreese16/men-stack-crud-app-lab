const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const CarModel = require("./models/car");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", function () {
  console.log(`Connected to DB ${mongoose.connection.name}`);
});

//Midleware start
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
// Middleware end

// Update code start
app.get("/cars/:carId/edit", async function (req, res) {
  const carDoc = await CarModel.findById(req.params.carId, req.body);
  res.render("cars/edit.ejs", { car: carDoc });
});
app.put("/cars/:carId", async function (req, res) {
  await CarModel.findByIdAndUpdate(req.params.carId, req.body);
  res.redirect(`/cars/${req.params.carId}`);
});
// Update code end

// Delete code start
app.delete("/cars/:carId", async function (req, res) {
  const deletedCar = await CarModel.findByIdAndDelete(req.params.carId);
  res.redirect("/cars");
});
// Delete code end

// Route to get the create form start
app.get("/cars/new", async function (req, res) {
  res.render("cars/new.ejs");
});
// Route to get the create form end

// Code to find the data from the DB start
app.get("/cars/:carId", async function (req, res) {
  const carDoc = await CarModel.findById(req.params.carId);
  res.render("cars/show.ejs", { car: carDoc });
});

app.get("/cars", async function (req, res) {
  const allCarDocs = await CarModel.find({});
  console.log(allCarDocs);
  res.render("cars/index.ejs", { carDocs: allCarDocs });
});
// Code to find the data from the DB end

// Create a new car start
app.post("/cars", async function (req, res) {
  console.log(req.body, "<- contents of the form");
  const createdCar = await CarModel.create(req.body);
  console.log(createdCar);
  res.redirect("/cars");
});
// Create a new car end

// Landing page start
app.get("/", function (req, res) {
  res.render("index.ejs");
});
// Landing page end

// Port the server listens on
app.listen(3000, function () {
  console.log("Server is listening for a response on port 3000.");
});
