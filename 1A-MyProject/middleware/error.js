const errorHandler = (err, req, res, next) => {
  console.log(err.stack.cyan.underline);

  res.status(400).json({
    success: false,
    error: err.message,
  });
};

module.exports = errorHandler;
