const express = require("express");
const cors = require("cors");

const productRouter = require("./routes/productRouter");
const bookRouter = require("./routes/bookRouter");

const app = express();

app.use(cors());
app.use(express.json()); //req.body={}

//url
app.use("/products", productRouter);
app.use("/books", bookRouter);
app.use((req, res, next) => {
  res.status(404).send({ error: "API NOT SUPPORTED" });
});

app.listen(3000, () => {
  console.log("SERVER RUNNING SUCCESSFULLY ... ON PORT: 3000 !!!!");
});
