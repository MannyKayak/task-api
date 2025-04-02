const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("Errore: ", err.message);

  const errorStatus = res.statusCode !== 200 ? res.statusCode : 500;
  const errorMessage = err.message || "Internal server error";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = errorHandlerMiddleware;
