const mongoose = require("mongoose");

const BookShema = new mongoose.Schema({
  //id, title, ISBN, publishedDate, author
  id: {
    type: Number,
    required: [true, "Please input id number"],
    unique: true,
    // min: [100, "ID must at least 3 digits"],
  },
  title: {
    type: String,
    required: [true, "Please input the Book name"],
    unique: true,
    trim: true,
    maxLenght: [50, "Reach maximum length of letter 50"],
  },
  ISBN: {
    type: Number,
    required: [true, "Please input ISBN number"],
    unique: true,
    // min: [100, "ISBN number must at least 3 digits"],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: [true, "Author name required"],
    maxlength: [50, "Reach maximum length of letter 50"],
  },
});

module.exports = mongoose.model("Book", BookShema);
