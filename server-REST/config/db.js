const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://mikerdene:06130425ml@amazon.0nibz.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  console.log(
    `MongoDB connected : ${conn.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;
// mongodb+srv://mikerdene:06130425ml@amazon.0nibz.mongodb.net/test
