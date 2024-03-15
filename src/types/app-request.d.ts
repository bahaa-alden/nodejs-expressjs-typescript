import { Request } from "express";
import User from "../models/user.model";

declare interface RoleRequest extends Request {
  currentRoleCodes: string[];
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
}

declare interface PaginateRequest extends ProtectedRequest {
  query: { page?: number; limit?: number };
}
