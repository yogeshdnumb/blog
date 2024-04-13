const asyncHandler = require("express-async-handler");
const reviewModel = require("../models/reviewModel");

exports.reviews_get = asyncHandler(async function (req, res, next) {
  const reviews = await reviewModel.find();
  if (reviews.length != 0) {
    res.status(200).json({ message: "got reviews", reviews });
  } else {
    res.status(400).json({ message: "no reviews" });
  }
});

exports.review_get = asyncHandler(async function (req, res, next) {
  const review = await reviewModel.findOne({ id: req.params.reviewId });
  if (review) {
    res.status(200).json({
      message: `got review with id=${req.params.reviewId}`,
      review,
    });
  } else {
    res
      .status(400)
      .json({ message: `review with id=${req.params.reviewId} not found` });
  }
});

exports.protected_get = asyncHandler(async function (req, res, next) {
  res.send('protected')
})