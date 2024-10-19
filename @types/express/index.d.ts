import { ZodIssue } from "zod";
import IUser from "../../src/models/user.model";
import { RoleCode } from "../../src/utils/enum";

export type HeaderObject = {
  [key: string]: string;
};

export type ParamObject = {
  [key: string]: string;
};

export type QueryObject = {
  [key: string]: string | string[];
};

export type BodyObject = {
  [key: string | symbol]: string;
};

export type ResponsePayload = {
  data?: any;
  errors?: ZodIssue[];
  message: string;
};

declare module "express" {
  interface Request {
    body: BodyObject;
    user: IUser;
    params: ParamObject;
    query: QueryObject;
    headers: HeaderObject;
    currentRoleCodes: RoleCode[];
  }

  interface Response {
    ok(payload: ResponsePayload): Response<any, Record<string, any>>;

    created(payload: ResponsePayload): Response<any, Record<string, any>>;

    noContent(payload?: ResponsePayload): Response<any, Record<string, any>>;
  }

  interface ParsedRequest<B = any, Q = any, P = any, H = any> extends Request {
    valid: { body: B; query: Q; params: P; headers: H };
  }
}
