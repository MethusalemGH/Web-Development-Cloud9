const methodOverride = require(`method-override`);
const localStrategy = require(`passport-local`);
const flash = require(`connect-flash`);
const parser = require(`body-parser`);
const mongoose = require(`mongoose`);
const passport = require(`passport`);
const express = require(`express`);
const app = express();

mongoose.connect(`mongodb://localhost/yelpCamp`);
app.use(parser.urlencoded({ extended: true }));
app.use(methodOverride(`_method`));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);

app.use(flash());

const campgroundRoutes = require(`./routes/campgrounds`);
const commentRoutes = require(`./routes/comments`);
const indexRoutes = require(`./routes/index`);
const userRoutes = require(`./routes/users`);

// Set up authentication
const User = require(`./models/user`);
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

// Middleware to always have currentUser available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash(`error`);
  res.locals.success = req.flash(`success`);
  next();
});

app.use(`/campgrounds`, campgroundRoutes);
app.use(`/campgrounds/:id/comments`, commentRoutes);
app.use(`/`, indexRoutes);
app.use(`/`, userRoutes);

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
