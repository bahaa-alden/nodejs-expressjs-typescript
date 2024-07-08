import { NextFunction, Response } from "express";
import { RoleRequest } from "../types/app-request";
import { RoleCode } from "../utils/enum";

export default (...roleCodes: RoleCode[]) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
