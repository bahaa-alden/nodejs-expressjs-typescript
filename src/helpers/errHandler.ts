import express from "express";
import { env_vars } from "../config";
import {
  ApiError,
  AuthFailureError,
  ErrorType,
  InternalError,
} from "../core/ApiError";
import Logger from "../core/Logger";

export default (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err.name === "AuthenticationError")
    ApiError.handle(new AuthFailureError("unauthorized"), res);
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    Logger.error(err);
    if (env_vars.env === "development") {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
};
