const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  post: String,
  username: String,
  userAvatar: String,
  userId: String,
});

module.exports = mongoose.model("post", postSchema);
