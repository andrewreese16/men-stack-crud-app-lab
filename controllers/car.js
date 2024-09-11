const express = require("express");
const router = express.Router();
const CarModel = require("../models/car");






// Update code start
router.get("/:carId/edit", async function (req, res) {
    const carDoc = await CarModel.findById(req.params.carId, req.body);
    res.render("cars/edit.ejs", { car: carDoc });
  });
  router.put("/:carId", async function (req, res) {
    await CarModel.findByIdAndUpdate(req.params.carId, req.body);
    res.redirect(`/cars/${req.params.carId}`);
  });
  // Update code end
  
  // Delete code start
  router.delete("/:carId", async function (req, res) {
    const deletedCar = await CarModel.findByIdAndDelete(req.params.carId);
    res.redirect("/cars");
  });
  // Delete code end
  
  // Route to get the create form start
  router.get("/new", async function (req, res) {
    res.render("cars/new.ejs");
  });
  // Route to get the create form end
  
  // Code to find the data from the DB start
  router.get("/:carId", async function (req, res) {
    const carDoc = await CarModel.findById(req.params.carId);
    res.render("cars/show.ejs", { car: carDoc });
  });
  
  router.get("/", async function (req, res) {
    const allCarDocs = await CarModel.find({});
    console.log(allCarDocs);
    res.render("cars/index.ejs", { carDocs: allCarDocs });
  });
  // Code to find the data from the DB end
  
  // Create a new car start
  router.post("/", async function (req, res) {
    console.log(req.body, "<- contents of the form");
    const createdCar = await CarModel.create(req.body);
    console.log(createdCar);
    res.redirect("/cars");
  });
  // Create a new car end









module.exports = router;
