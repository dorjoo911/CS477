const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // photo: {
  //   type: String,
  //   default: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360",
  // },
  // following: [{ userId: String }],
  // tweets: [{ tweetId: String }],
});

module.exports = mongoose.model("User", userSchema);
