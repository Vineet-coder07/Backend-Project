import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "Something went wrong";

  if (err instanceof mongoose.Error) statusCode = 400;
  if (err.statusCode) statusCode = err.statusCode;

  const response = {
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
  };

  return res.status(statusCode).json(response);
};

export { errorHandler };
