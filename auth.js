const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const SocialUser = require("./models/userModel");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallBack: true,
    },
    function (accessToken, refreshToken, profile, done) {
      SocialUser.findOrCreate(
        { userId: profile.id, name: profile.displayName },
        function (err, user) {
          return done(null, profile);
        }
      );
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});
