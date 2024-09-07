const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const CarModel = require("./models/car");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", function () {
  console.log(`Connected to DB ${mongoose.connection.name}`);
});

//Midleware
app.use(express.urlencoded({ extended: false }));

app.get("/cars/new", async function (req, res) {
  res.render("cars/new.ejs");
});

app.get("/cars", async function (req, res) {
  const allCarDocs = await CarModel.find({});
  console.log(allCarDocs);
  res.render("cars/index.ejs", { carDocs: allCarDocs });
});

app.post("/cars", async function (req, res) {
  console.log(req.body, "<- contents of the form");

  const createdCar = await CarModel.create(req.body);
  console.log(createdCar);
  res.redirect("/cars/new");
});

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.listen(3000, function () {
  console.log("Server is listening for a response on port 3000.");
});
