/**
 * Express
 */
require('dotenv').config();
const express = require("express");
const passport = require("passport");
const app = express();
require("./auth");
app.set('view engine', 'ejs');
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
  req.user ? next() : res.status(401).send('Unauthorised user!');
}
// passport

app.get("/", function (req, res) {
    res.render('pages/auth', {user : req.user});

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
    successRedirect: "/dashboard",
    failureRedirect: "/failure",
  })
);

app.get("/dashboard", isLoggedIn, function (req, res) {
   res.render('pages/user/dashboard', {user : req.user});
});
app.get("/failure", function (req, res) {
  return res.send("Hello something went wrong");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));
