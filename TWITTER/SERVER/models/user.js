const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  //_id "user-1*#d*sgf*5f1dg*51df5"
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: String,
  following: [],
});

module.exports = mongoose.model("User", userSchema);
