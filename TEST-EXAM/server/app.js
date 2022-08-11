const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use((err, req, res, next) => {
  res.status(404).json("Something is wrong");
});

mongoose.connect("mongodb://127.0.0.1:27017/movie", () => {
  console.log(`DB connected, successfully`);
  app.listen(3000, () => {
    console.log(`Server is running ...`);
  });
});
