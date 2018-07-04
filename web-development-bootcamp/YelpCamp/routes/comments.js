const express = require(`express`);
const router = express.Router({ mergeParams: true });

const middleware = require(`../middleware/index`);
const Campground = require(`../models/campground`);
const Comment = require(`../models/comment`);

// New	/campgrounds/:id/comments/new	GET	Show new Comments form	N/A
router.get(`/new`, middleware.isLoggedIn, (req, res) => {
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
router.post(`/`, middleware.isLoggedIn, (req, res) => {
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
          // save somment
          comment.author.username = req.user.username;
          comment.author.id = req.user._id;
          comment.save();
          // save campground
          campground.comments.push(comment);
          campground.save();

          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

// Edit	/campgrounds/:id/comments/:comment_id/edit	GET	Show edit form for one Comment	Comment.findById()
router.get(`/:comment_id/edit`, middleware.isCommentOwner, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      console.log(err);
    }
    else {
      Campground.findById(req.params.id, (err, campground) => {
        if (err) {
          console.log(err);
        }
        else {
          res.render(`./comments/edit`, { campground: campground, comment: comment });

        }
      });
    }
  });
});

//Update	/campgrounds/:id/comments/:comment_id	PUT	Update particular Comment, then redirect somewhere	Comment.findByIdAndUpdate()
router.put(`/:comment_id`, middleware.isCommentOwner, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

// Destroy	/campgrounds/:id/commebts/:comment_id	DELETE	Delete a particular Comment, then redirect somewhere	Comment.findByIdAndRemove()
router.delete('/:comment_id', middleware.isCommentOwner, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

module.exports = router;
