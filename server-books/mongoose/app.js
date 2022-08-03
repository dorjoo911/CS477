const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRouter = require("./routes/productRouter");
const bookRouter = require("./routes/bookRouter");

const app = express();

app.use(cors()); //No more CORS issue: mongodb://localhost:27017 == mongodb://localhost:3000
app.use(express.json()); //req.body={}

//url
app.use("/products", productRouter); //use the url from router
app.use("/books", bookRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: "API NOT SUPPORTED" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/shopping")
  .then(() => {
    app.listen(3000);
    console.log("Connected mongoose-----------");
  })
  .catch((err) => console.error(err));
