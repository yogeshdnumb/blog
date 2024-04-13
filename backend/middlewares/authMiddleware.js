require('dotenv').config()
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')

exports.authMiddleware = asyncHandler(async function (req, res, next) {
  const authHeaders = req.headers["authorization"]
  if (!authHeaders) {
    return res.status(401).json({ msg: "no auth headers" })
  }
  const token = authHeaders.split(" ")[1]
  console.log(token);


  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "error in jwt verify", err })
    }
    req.user = decoded.username
    next()

  })
  // next()

})