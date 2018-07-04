const express = require(`express`);
const router = express.Router();

// Index	/campgrounds	GET	List all campgrounds	Campground.find()
router.get(`/`, (req, res) => {
  console.assert(req); // unreferenced parameter
  res.redirect(`/campgrounds`);
});

module.exports = router;
