const passportLocalMongoose = require(`passport-local-mongoose`);
const localStrategy = require(`passport-local`);
const parser = require(`body-parser`);
const mongoose = require(`mongoose`);
const passport = require(`passport`);
const express = require(`express`);
const app = express();
console.assert(passportLocalMongoose);

mongoose.connect(`mongodb://localhost/AuthDemo`);
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);

// Application requirements
const User = require('./models/user');

// Set up authentication
app.use(require(`express-session`)({
  secret: `Why would I tell you my secrets?`,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // Has to be AFTER require(`express-session`)
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware function to check for active user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // console.log(req.user.username);
    return next();
  }
  res.redirect(`/login`);
};

// Index	/authentication	GET	Show Index page
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.redirect(`/authentication`);
});

// Index	/authentication	GET	Show Index page
app.get(`/authentication`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`./index`);
});

// Show	/secret	GET	Show "secret" page
app.get(`/secret`, isLoggedIn, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`./secret`);
});

// Register	/register	GET	Show register form
app.get(`/register`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`./register`);
});

// Register	/register	POST Sign up new user
app.post(`/register`, (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err) => {
    if (err) {
      console.log(err);
      res.redirect(`/register`);
    }
    else {
      passport.authenticate(`local`)(req, res, () => {
        res.redirect(`/secret`);
      });
    }
  });
});

// Login	/login	GET	Show login form
app.get(`/login`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`./login`);
});

// Login	/login	POST Log in existing user
app.post(`/login`, passport.authenticate(`local`, { // passport.authenticate used as middleware
  successRedirect: `/secret`,
  failureRedirect: `/login`
}));

// Logout	/logout	GET	Log out active user
app.get(`/logout`, (req, res) => {
  req.logout();
  res.redirect(`/authentication`);
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
