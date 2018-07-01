const express = require(`express`);
const parser = require(`body-parser`);
const mongoose = require(`mongoose`);
const app = express();

mongoose.connect(`mongodb://localhost/yelpCamp`);
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(`public`));
app.set(`view engine`, `ejs`);

const Campground = require(`./models/campground`);
const Comment = require(`./models/comment`);
console.assert(Comment);

// The following two lines will initialize the DB records
// Can be removed if the DB structure hasn't changed
// const seedDB = require(`./seeds`);
// seedDB();

//////////////////////////////////////////////////////////////////
// Campgrounds Routes
//////////////////////////////////////////////////////////////////

// Index	/campgrounds	GET	List all campgrounds	Campground.find()
app.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.redirect(`/campgrounds`);
});

// Index	/campgrounds	GET	List all campgrounds	Campground.find()
app.get(`/campgrounds`, (req, res) => {
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
app.get(`/campgrounds/new`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.render(`./campgrounds/new`);
});

// Create	/campgrounds	POST	Create a new Campground, then redirect somewhere	Campground.create()
app.post(`/campgrounds`, (req, res) => {
  const name = req.body.name;
  const imageURL = req.body.imageURL;
  const description = req.body.description;

  const newCampground = { name: name, imageURL: imageURL, description: description };
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
app.get(`/campgrounds/:id`, (req, res) => {
  console.assert(req); // unreferenced parameter
  Campground.findById(req.params.id).populate(`comments`).exec((err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render(`./campgrounds/show`, { campground: campground });
    }
  });
});

//////////////////////////////////////////////////////////////////
// Comments Routes
//////////////////////////////////////////////////////////////////

// New	/campgrounds/:id/comments/new	GET	Show new Comments form	N/A
app.get(`/campgrounds/:id/comments/new`, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render(`./comments/new`, { campground: campground });
    }
  });
});

// Create	/campgrounds/:id/comments	POST	Create a new Comment, then redirect somewhere	Comment.create()
app.post(`/campgrounds/:id/comments`, (req, res) => {
  // Look up campground from ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      // Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        }
        else {
          campground.comments.push(comment);
          campground.save();

          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started! Listening at PORT ${process.env.PORT}, IP ${process.env.IP}.`);
});
