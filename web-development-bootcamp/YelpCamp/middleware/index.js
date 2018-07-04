const Campground = require(`../models/campground`);
const Comment = require(`../models/comment`);

const middlewareObj = {};

middlewareObj.isCampgroundOwner = (req, res, next) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      res.redirect(`back`);
    }
    else {
      if (req.isAuthenticated() === false) {
        req.flash(`error`, `You need to be logged in to do that`);
        res.redirect(`back`);
      }
      else {
        if (campground.author.id.equals(req.user._id) === false) {
          req.flash(`error`, `Only the author can edit or delete the campground`);
          res.redirect(`back`);
        }
        else {
          next();
        }
      }
    }
  });
};

middlewareObj.isCommentOwner = (req, res, next) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      res.redirect(`back`);
    }
    else {
      if (req.isAuthenticated() === false) {
        req.flash(`error`, `You need to be logged in to do that`);
        res.redirect(`back`);
      }
      else {
        if (comment.author.id.equals(req.user._id) === false) {
          req.flash(`error`, `Only the author can edit or delete the comment`);
          res.redirect(`back`);
        }
        else {
          next();
        }
      }
    }
  });
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // console.log(req.user.username);
    return next();
  }
  req.flash(`error`, `You need to be logged in to do that`);
  res.redirect(`/login`);
};

module.exports = middlewareObj;
