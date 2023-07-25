const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  console.log({ err: err.response })
  err.message = err.response.data.message || err.message || "Internal Server Error";

  res.status(err.response.status || err.statusCode || 500).json({
    error: {
      message: err.message,
    },
  });
};
