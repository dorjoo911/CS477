const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input Category name"],
    unique: true,
    trim: true,
    maxlength: [50, "Reached maximum length of Category name letter 50"],
  },
  description: {
    type: String,
    required: [true, "Description required"],
    maxlength: [500, "Reached maximum length of letter 500"],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must atleast 1"],
    max: [10, "Rating can not be more than 10"],
  },
  averagePrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
