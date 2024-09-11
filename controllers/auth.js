const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

router.get("/sign-out", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.get("/sign-up", function (req, res) {
  res.render("cars/sign-up.ejs");
});

router.get("/sign-in", function (req, res) {
  res.render("cars/sign-in.ejs");
});

router.post("/sign-in", async function (req, res) {
  const userInDb = await UserModel.findOne({
    username: req.body.username,
  });
  if (!userInDb) {
    return res.send("Login failed, Please Try Again.");
  }

  const isPasswordValid = bcrypt.compareSync(
    req.body.password,
    userInDb.password
  );
  if (!isPasswordValid) {
    return res.send("Login failed, Please Try Again")
  }
  req.session.user = {
    username: userInDb.username,
    _id: userInDb._id,
  };
  res.redirect("/");
});

router.post("/sign-up", async function (req, res) {
  const userInDb = await UserModel.findOne({
    username: req.body.username,
  });
  if (userInDb) {
    return res.send("Username already taken");
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Passwords much match.");
  }
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashPassword;
  const userDoc = await UserModel.create(req.body);
  res.redirect("/");
});

module.exports = router;
