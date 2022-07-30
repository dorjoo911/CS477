const express = require("express");
// const path = require("path");

//Route instantiate
const bookRoutes = require("./routers/bookRouter");

const app = express();

//Body parser
app.use(express.json());

//initial path
app.use("api/v1/books", bookRoutes);

//Error handler
// app.use((err, req, res, next) => {
//   res.status(400).json({
//     success: false,
//     error: err.message,
//   });
// });

app.listen(7000, () => {
  console.log(`THE SERVER RUNNING ON PORT: 7000 SUCCESSFULLY ... !!! `);
});
