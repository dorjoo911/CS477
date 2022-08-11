const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRouter = require("./router/productRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: `API NOT Supported !!!` });
});

app.use((err, req, res, next) => {
  res.status(500).send({ myError: err.message });
});

mongoose.connect("mongodb://127.0.0.1:27017/eshop").then(() => {
  console.log(`ESHOP DATA BASE CONNECTED SUCCESSFULLY !!!`);
  app.listen(4000, () => {
    console.log(`SERVER RUNNING >>> >>>> >>>`);
  });
});
