const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  vin: String,
});

const CarModel = mongoose.model("Car", carSchema);

module.exports = CarModel;
