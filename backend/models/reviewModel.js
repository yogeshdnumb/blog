const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  author: { type: mongoose.SchemaTypes.ObjectId },
  college: { type: String },
  review: { type: String },
  recommended: { type: Boolean },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reviews", reviewSchema);
