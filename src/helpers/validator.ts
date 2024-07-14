import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { string, ZodError, ZodTypeAny } from "zod";

import { BadRequestError } from "../core/ApiError";
import asyncHandler from "./asyncHandler";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

// Custom Zod validators
export const zodObjectId = string().refine((value) => isValidObjectId(value), {
  message: "Invalid ObjectId",
});

export const zodAuthBearer = string().refine(
  (value) => {
    if (!value.startsWith("Bearer ")) return false;
    if (!value.split(" ")[1]) return false;
    return true;
  },
  {
    message: "Invalid Authorization Header",
  }
);

export default (
  schema: ZodTypeAny,
  source: ValidationSource = ValidationSource.BODY
) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[source]);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError("Validation error", error.errors);
      }
      throw error;
    }
  });
