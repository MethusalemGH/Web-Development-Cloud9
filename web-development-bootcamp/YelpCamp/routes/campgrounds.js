const express = require(`express`);
const router = express.Router();

const middleware = require(`../middleware/index`);
const Campground = require(`../models/campground`);

// Index	/campgrounds	GET	List all campgrounds	Campground.find()
router.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render(`./campgrounds/index`, { campgrounds: campgrounds });
    }
  });
});

// New	/campgrounds/new	GET	Show new Campground form	N/A
router.get(`/new`, middleware.isLoggedIn, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`./campgrounds/new`);
});

// Create	/campgrounds	POST	Create a new Campground, then redirect somewhere	Campground.create()
router.post(`/`, middleware.isLoggedIn, (req, res) => {
  const name = req.body.name;
  const imageURL = req.body.imageURL;
  const description = req.body.description;

  const author = { id: req.user._id, username: req.user.username };
  const newCampground = { name: name, imageURL: imageURL, description: description, author: author };

  Campground.create(newCampground, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect(`/campgrounds`);
    }
  });
});

// Show	/campgrounds/:id	GET	Show info about one specific Campground	Campground.findById()
router.get(`/:id`, (req, res) => {
  Campground.findById(req.params.id).populate(`comments`).exec((err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render(`./campgrounds/show`, { campground: campground });
    }
  });
});

// Edit	/campgrounds/:id/edit	GET	Show edit form for one Campground	Campground.findById()
router.get(`/:id/edit`, middleware.isCampgroundOwner, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render(`./campgrounds/edit`, { campground: campground });
    }
  });
});

//Update	/campgrounds/:id	PUT	Update particular Campground, then redirect somewhere	Campground.findByIdAndUpdate()
router.put(`/:id`, middleware.isCampgroundOwner, (req, res) => {
  req.body.campground.author = { id: req.user._id, username: req.user.username };
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect(`/campgrounds/${campground._id}`);
    }
  });
});

// Destroy	/campgrounds/:id	DELETE	Delete a particular Campground, then redirect somewhere	Campground.findByIdAndRemove()
router.delete('/:id', middleware.isCampgroundOwner, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect(`/campgrounds`);
    }
  });
});

module.exports = router;
