const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, uniquie: true },
  password: { type: String, required: true },
  joined: { type: Date, default: Date.now },
  avatar: {
    type: String,
    default:
      "https://www.citypng.com/public/uploads/preview/download-profile-user-round-orange-icon-symbol-png-11639594360ksf6tlhukf.png",
  },
  role: { type: String, default: "user" },
  savedMovies: [
    {
      movieId: String,
      title: String,
      savedDate: { type: Date, default: Date.now },
    },
  ],
  watchedMovies: [
    {
      movieId: String,
      title: String,
      watchedDate: { type: Date, default: Date.now },
    },
  ],
  friends: [
    {
      username: String,
      avatar: String,
      userId: String,
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
