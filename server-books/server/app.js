const express = require("express");
const cors = require("cors");

const productRouter = require("./routes/productRouter");
const bookRouter = require("./routes/bookRouter");
const { mongoConnect } = require("./utils/database");

const app = express();

app.use(cors());
app.use(express.json()); //req.body={}

//url
app.use("/products", productRouter);
app.use("/books", bookRouter);
app.use((req, res, next) => {
  res.status(404).send({ error: "API NOT SUPPORTED" });
});

mongoConnect(() => {
  app.listen(3000);
  console.log("SERVER SUCCESSFULLY CONNECTED DATABASE ON PORT: 3000 !!!!");
});
