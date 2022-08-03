const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ISBN: Number,
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  author: String,
});

module.exports = mongoose.model("Book", bookSchema);
