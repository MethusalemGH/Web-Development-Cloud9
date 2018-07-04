const passport = require(`passport`);
const express = require(`express`);
const router = express.Router();

const User = require(`../models/user`);

// Register	/register	GET	Show register form
router.get(`/register`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`./users/register`);
});

// Register	/register	POST Sign up new user
router.post(`/register`, (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      req.flash(`error`, err.message);
      res.redirect(`/register`);
    }
    else {
      passport.authenticate(`local`)(req, res, () => {
        req.flash(`success`, `You are now signed up for YelpCamp. Glad to meet you ${req.body.username}!`);
        res.redirect(`/campgrounds`);
      });
    }
  });
});

// Login	/login	GET	Show login form
router.get(`/login`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`./users/login`);
});

// Login	/login	POST Log in existing user
router.post(`/login`, passport.authenticate(`local`, { // passport.authenticate used as middleware
  // successRedirect: `/campgrounds`,
  // successFlash: `You are now logged in to YelpCamp. Welcome back!`,
  failureRedirect: `/login`,
  failureFlash: true
}), (req, res) => {
  req.flash(`success`, `You are now logged in as ${req.body.username}. Welcome back!`);
  res.redirect(`/campgrounds`);
});

// Logout	/logout	GET	Log out active user
router.get(`/logout`, (req, res) => {
  req.logout();
  req.flash(`success`, `You are now logged out from YelpCamp`);
  res.redirect(`/campgrounds`);
});

module.exports = router;
