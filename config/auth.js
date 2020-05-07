const authentication = {
  ensureAuthenticated: function(req, res, next) {
    console.log(typeof req.isAuthenticated);
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "please log in to view the resource");
    res.redirect("/users/login");
  },
  forwardAuthentication: function(req, res, next) {
    console.log(typeof req.isAuthenticated);
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  }
};

module.exports = authentication;
