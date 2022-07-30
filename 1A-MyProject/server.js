const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");
var morgan = require("morgan");
const logger = require("./middleware/logger");
// Router оруулж ирэх
const categoriesRoutes = require("./routes/categories");
// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });
const app = express();

connectDB();

// create a write stream (in append mode)
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

//Body parser
app.use(express.json());

app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRoutes);
app.use(errorHandler);

const server = app.listen(
  process.env.PORT,
  console.log(`THE SERVER RUNNING ON PORT: ${process.env.PORT} ... !`.rainbow)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`ERROR OCCURED : ${err.message}`.underline.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
