const express = require("express");
const cors = require("cors");

const productRouter = require("./routes/productRouter");
const bookRouter = require("./routes/bookRouter");
const { mongoConnect } = require("./utils/database"); //mongoConnect object

const app = express();

app.use(cors()); //No more CORS issue: mongodb://localhost:27017 == mongodb://localhost:3000
app.use(express.json()); //req.body={}

//url
app.use("/products", productRouter); //use the url from router
app.use("/books", bookRouter);
app.use((req, res, next) => {
  res.status(404).send({ error: "API NOT SUPPORTED" });
});

mongoConnect(() => {
  app.listen(3000); // connect DB on mongodb://localhost:3000
  console.log("SERVER SUCCESSFULLY CONNECTED DATABASE ON PORT: 3000 !!!!");
});
