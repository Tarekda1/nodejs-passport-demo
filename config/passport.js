const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//load user model
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //check if user is found
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: "Invalid email" });
        }

        //if user is found then we match passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
