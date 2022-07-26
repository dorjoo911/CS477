const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const data = {
    name: 23,
  };
  res.sendFile("data", (err) => {
    if (err) throw new Error("OOps");
  });
});

app.listen(3000, () => {
  `serever running ...... ....`;
});
