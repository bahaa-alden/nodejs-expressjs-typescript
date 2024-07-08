import { Request } from "express";
import User from "../models/user.model";
import { RoleCode } from "../utils/enum";

declare interface RoleRequest extends Request {
  currentRoleCodes: RoleCode[];
  body: B;
  query: Q;
  params: P;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
}

declare interface PaginateRequest extends ProtectedRequest {
  query: { page?: number; limit?: number };
}
