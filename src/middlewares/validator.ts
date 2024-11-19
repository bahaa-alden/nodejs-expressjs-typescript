import { NextFunction, Response, ParsedRequest } from 'express';
import { isValidObjectId } from 'mongoose';
import { AnyZodObject, string, ZodEffects } from 'zod';
import asyncHandler from './asyncHandler';
import { BadRequestError } from '../core/ApiError';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

export type ValidProps = {
  query?: AnyZodObject | ZodEffects<AnyZodObject>;
  params?: AnyZodObject | ZodEffects<AnyZodObject>;
  headers?: AnyZodObject | ZodEffects<AnyZodObject>;
  body?: AnyZodObject | ZodEffects<AnyZodObject>;
};

// Custom Zod validators
export const zodObjectId = string().refine((value) => isValidObjectId(value), {
  message: 'Invalid ObjectId',
});

export const zodAuthBearer = string().refine(
  (value) => {
    if (!value.startsWith('Bearer ')) return false;
    if (!value.split(' ')[1]) return false;
    return true;
  },
  {
    message: 'Invalid Authorization Header',
  },
);

export default (props: ValidProps) =>
  asyncHandler(
    async (req: ParsedRequest, res: Response, next: NextFunction) => {
      req.valid = {
        body: null,
        params: null,
        query: null,
        headers: null,
      };

      if (props.query && 'query' in req) {
        const validationResult = await props.query.safeParseAsync(req.query);
        if (!validationResult.success) {
          throw new BadRequestError(
            'Validation error',
            validationResult.error.errors,
          );
        }
        req.valid.query = validationResult.data;
      }

      if (props.params && 'params' in req) {
        const validationResult = await props.params.safeParseAsync(req.params);
        if (!validationResult.success) {
          throw new BadRequestError(
            'Validation error',
            validationResult.error.errors,
          );
        }
        req.valid.params = validationResult.data;
      }
      if (props.body && 'body' in req) {
        const validationResult = await props.body.safeParseAsync(req.body);
        if (!validationResult.success) {
          throw new BadRequestError(
            'Validation error',
            validationResult.error.errors,
          );
        }
        req.valid.body = validationResult.data;
      }
      if (props.headers && 'headers' in req) {
        const validationResult = await props.headers.safeParseAsync(
          req.headers,
        );
        if (!validationResult.success) {
          throw new BadRequestError(
            'Validation error',
            validationResult.error.errors,
          );
        }
        req.valid.headers = validationResult.data;
      }
      next();
    },
  );
