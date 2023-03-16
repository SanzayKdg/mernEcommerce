const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate email error
  if (err.code === 11000) {
    const message = `User already exists. Please try another email`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JSON web token
  if (err.name === "JsonWebTokenError") {
    const message = `Json WebToken is invalid, Please try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json WebToken is expired, Please try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
