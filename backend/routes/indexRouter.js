const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router
  .get("/login", indexController.login_get)
  .post("/login", indexController.login_post);

router
  .get("/register", indexController.register_get)
  .post("/register", indexController.register_post);

module.exports = router;
