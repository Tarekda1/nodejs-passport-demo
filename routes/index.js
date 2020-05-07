const express = require("express");
const router = express.Router();

//get authentication middlewares from auth
const {
  forwardAuthentication,
  ensureAuthenticated
} = require("../config/auth");

//Welcome page
router.get("/", forwardAuthentication, (req, res) => res.render("welcome"));

//dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user
  });
});

module.exports = router;
