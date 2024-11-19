import { Request, Response, NextFunction } from 'express';
import {
  SuccessResponse,
  CreatedResponse,
  NoContentMsgResponse,
} from '../core/ApiResponse';

const customResponses = (req: Request, res: Response, next: NextFunction) => {
  res.ok = function (payload) {
    return new SuccessResponse(payload.message, payload.data).send(res);
  };

  res.created = function (payload) {
    return new CreatedResponse(payload.message, payload.data).send(res);
  };

  res.noContent = function (payload?) {
    return new NoContentMsgResponse(payload?.message).send(res);
  };

  next();
};

export default customResponses;
