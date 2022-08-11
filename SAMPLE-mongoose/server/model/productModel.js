const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    car: String,
    tag: String,
    owner: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Products", productSchema);
