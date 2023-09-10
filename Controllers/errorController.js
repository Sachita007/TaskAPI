const AppError = require("./../Utils/appError");

// Send Error When App In production
const sendErrorProd = (err, res) => {
  //operational , trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programmer or other unknown error: dont't leak error details
  else {
    // 1) Log the error
    console.log("Error", err);
    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very worng",
    });
  }
};

// Database Error Handling
const handleDBError = (err) => {
  let error = { ...err };

  // Duplicate Key Error (common with MongoDB)
  if (err.name === "MongoServerError" && err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exists`;
    error = new AppError(message, 400);
  }

  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const message = err.message;
    error = new AppError(message, 400);
  }

  // Mongoose Cast Error (invalid ID)
  else if (err.name === "CastError") {
    message = `Invalid ${err.path}:${err.value}`;
    error = new AppError(message, 400);
  }

  return error;
};

// Global Error Handling Function
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;
  error.name = err.name;
  error = handleDBError(error);

  sendErrorProd(error, res);
};
