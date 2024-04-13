require('dotenv').config()
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register_get = asyncHandler(async function (req, res, next) {
  res.json({ '1': '1' });
});
exports.register_post = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username should not be empty")
    .isAlphanumeric()
    .withMessage("username cannot contain symbols/space")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password should not be empty")
    .isAlphanumeric()
    .withMessage("password cannot contain symbols/space")
    .escape(),

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ errors: errors.array(), msg: "Errors in form" });
    } else {
      const foundUser = await userModel.findOne({
        username: req.body.username,
      });
      if (foundUser) {
        res.status(409).json({ msg: "User already exists" });
      } else {
        const foundUser = new userModel();
        bcrypt.hash(req.body.password, 10, async (err, hashPassword) => {
          if (err) {
            next(err);
          } else {
            console.log(hashPassword);
            foundUser.username = req.body.username;
            foundUser.password = hashPassword;
            await foundUser.save();

            res.status(201).json({ msg: "User Created" });
          }
        });
      }
    }
  }),
];

exports.login_get = asyncHandler(async function (req, res, next) {
  res.render("login");
});

exports.login_post = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username should not be empty").escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password should not be empty").escape(),

  asyncHandler(async function (req, res, next) {
    // console.log(req.body);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ errors: errors.array(), message: "Errors in form" });
    }
    else {
      const foundUser = await userModel.findOne({ username: req.body.username })
      if (foundUser) {

        const match = await bcrypt.compare(req.body.password, foundUser.password)
        if (match) {
          const accessToken = jwt.sign({ username: foundUser.username }, process.env.ACCESS_SECRET, { expiresIn: "15m" })
          // const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_SECRET, { expiresIn: "14d" })

          // Store refresh token in httpOnly cookie
          // res.cookie("rt", refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000 })
          // res.cookie('a', 1, { httpOnly: false, sameSite: 'None', secure: true })

          res.cookie('a', 1).status(200).json({ msg: "Pass match", accessToken })


        } else {
          res.status(400).json({ msg: "Pass not match" })
        }
      } else {

        res.status(400).json({ msg: "User not found" })
      }
    }

  }),

];
