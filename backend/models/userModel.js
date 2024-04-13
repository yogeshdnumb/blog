const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  college: { type: String },
  password: { type: String }
});

module.exports = mongoose.model("Users", userSchema);
