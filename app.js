/**
 * Express
 */
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const app = express();
require("./auth");
app.set("view engine", "ejs");
/**
 * Passport
 */
const session = require("express-session");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.status(401).send("Unauthorised user!");
}
// passport

app.get("/", function (req, res) {
  if ( req.isAuthenticated() ) {
    res.render("pages/user/dashboard", { user: req.user });
  } else {
    res.render("pages/auth");
  }

  //   res.send(
  //     '<a href="/auth/google" class="btn btn-danger"><span class="fa fa-google"></span> SignIn with Google</a>'
  //   );
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/failure",
  })
);

app.get("/welcome", function (req, res) {
  if ( req.isAuthenticated() ) {
    res.render("pages/user/dashboard", { user: req.user });
  } else {
    res.redirect('/');
  }
});
app.get("/failure", function (req, res) {
  return res.send("Hello something went wrong");
});

app.get("/logout", function (req, res) {
  req.logout();
  req.session.destroy(()=>{
    res.redirect('/');
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));
