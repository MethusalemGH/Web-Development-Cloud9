const express = require(`express`);
const parser = require(`body-parser`);
const mongoose = require(`mongoose`);
const app = express();

mongoose.connect(`mongodb://localhost/yelpCamp`);
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);

// Campground Schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});
const Campground = mongoose.model("Campground", campgroundSchema);

// "/"    => Render home page
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`home`);
});

// "/"    => Show the different campgrounds
app.get(`/campgrounds`, (req, res) => {
  console.assert(req); // unreferenced parameter
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render(`campgrounds`, { campgrounds: campgrounds });
    }
  });
});

// "/"    => Add new campground site
app.post(`/campgrounds`, (req, res) => {
  const name = req.body.name;
  const image = req.body.image;

  const newCampground = { name: name, image: image };
  Campground.create(newCampground, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/campgrounds');
    }
  });
});

// "/"    => Add new campground site input
app.get(`/campgrounds/new`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`new`);
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
