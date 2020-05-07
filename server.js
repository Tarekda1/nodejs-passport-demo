const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const expressSession = require("express-session");

const app = express();

// Passport Config
require("./config/passport")(passport);

//DB config
const dbURI = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongodb Connected"))
  .catch(err => console.log("unable to connect to db"));

//EJS view engine
app.use(expressLayouts);
app.set("view engine", "ejs");

//set body parser before setting session
app.use(express.urlencoded({ extended: true }));

//session definition
const session = {
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
};

app.use(expressSession(session));

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//defining global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Mounting Routes to app
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

//define a port the application will listen on
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on http://localhost:${PORT}`));
