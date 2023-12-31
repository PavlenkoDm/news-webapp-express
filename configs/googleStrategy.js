const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://news-webapp-express.onrender.com/api/auth/google-redirect",
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
);

module.exports = { googleStrategy };
