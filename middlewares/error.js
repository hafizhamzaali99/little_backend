exports.errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate value for field: ${field}`;
    err.statusCode = err.statusCode || 400;
    err.message = message;
  }
  res.status(err.statusCode).json({
    message: err.message,
  });
};
