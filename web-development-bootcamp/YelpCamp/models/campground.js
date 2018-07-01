const mongoose = require(`mongoose`);

// Campground Schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
module.exports = mongoose.model("Campground", campgroundSchema);
