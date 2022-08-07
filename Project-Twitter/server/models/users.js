const mongoose = require("mongoose");

const { Schema } = mongoose;
// var url = "https://i.stack.imgur.com/34AD2.jpg";
const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: String,
    photo: { type: String, default: "https://i.stack.imgur.com/34AD2.jpg" },
    roll: String,
    following: [],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("users", userSchema);
