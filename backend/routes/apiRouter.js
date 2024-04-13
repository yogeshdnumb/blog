const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// reviews
router.get("/reviews", apiController.reviews_get);

// review
router.get("/reviews/:reviewId", apiController.review_get);

router.get("/protected", apiController.protected_get)

module.exports = router;
