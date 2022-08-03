const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routers/userRouter");
// const tweetRouter = require("./routes/tweetRouter");

const app = express();

app.use(cors()); //No more CORS issue: mongodb://localhost:27017 == mongodb://localhost:3000
app.use(express.json()); //req.body={}

//url
app.use("/users", userRouter); //use the url from router
// app.use("/tweets", tweetRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: "API NOT SUPPORTED" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/twitter")
  .then(() => {
    app.listen(3000, () => {
      console.log(`MONGOOSE DATA BASE SUCCESSFULLY CONNECTED ... !!!`);
    });
  })
  .catch((err) => console.error(err));
