const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");
const Response = require("./models/responseobj");

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.use((err, req, res, next) => {
  res.status(500).json(new Response(true, err.message, null));
});

mongoose.connect("mongodb://127.0.0.1:27017/twitter", () => {
  app.listen(3000);
  console.log(`DB connected ... `);
});
