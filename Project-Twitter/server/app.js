const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Response = require("./models/responseobj");

const userRouter = require("./routers/userRouter");
const tweetRouter = require("./routers/tweetRouter");
const authRouter = require("./routers/authRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
//   next();
// });

app.use("/tweetS", tweetRouter);
app.use("/login", authRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).json(new Response(true, err.message, null));
});

mongoose.connect("mongodb://127.0.0.1:27017/tweeter").then(() => {
  app.listen(3000, () => console.log("listening to 3000..."));
});
