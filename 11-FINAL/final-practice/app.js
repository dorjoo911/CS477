const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRouter = require("./routes/studentRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: "API NOT SUPPORT" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected successfully");
    });
  })
  .catch((err) => console.error(err));
