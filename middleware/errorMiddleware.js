import logger from "../config/logger.js";

export const notFound = (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Route ${req.originalUrl} not found`,
  });
};

export const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Server Error",
  });
};
