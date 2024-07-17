import { RoleCode } from "@utils/enum";
import { ZodIssue } from "zod";
import IUser from "../../models/user.model";

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

declare module "express-serve-static-core" {
  interface Request {
    body: BodyObject;
    user: IUser;
    params: ParamObject;
    query: QueryObject;
    currentRoleCodes: RoleCode[];
  }

  interface Response {
    ok(payload: ResponsePayload): Response<any, Record<string, any>>;

    created(payload: ResponsePayload): Response<any, Record<string, any>>;

    noContent(payload?: ResponsePayload): Response<any, Record<string, any>>;
  }
}
