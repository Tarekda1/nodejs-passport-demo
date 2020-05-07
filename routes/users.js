const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//load user model
const User = require("../models/User");

//load authentication middlewares
const { forwardAuthentication } = require("../config/auth");

//login page
router.get("/login", forwardAuthentication, (req, res) => {
  res.render("login");
});

router.get("/register", forwardAuthentication, (req, res) => {
  res.render("register");
});

router.post("/register", forwardAuthentication, (req, res) => {
  //get posted form
  const { name, email, password, password2 } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  //if form is not valid
  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    //check if user exits
    User.find({ email: email }).then(user => {
      //if email already exits
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", { errors, name, email, password, passowrd2 });
      }
    });
  }
});

//add other routes...

module.exports = router;
