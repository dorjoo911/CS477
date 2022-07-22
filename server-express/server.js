const express = require("express"); // Express init
const dotenv = require("dotenv"); // dotenv init

// Application settings load into process.env
dotenv.config({ path: "./config/config.env" });

const app = express(); //calling express server

app.get("/", (req, res) => {
  res.send("My express server responded successfully !!!");
});

app.listen(
  process.env.PORT,
  console.log(`Express server running on: ${process.env.PORT}`)
);
