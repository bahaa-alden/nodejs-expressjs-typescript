import { NextFunction, Response } from "express";
import { RoleCode } from "../utils/enum";
import { ParsedRequest } from "app-request";

export default (...roleCodes: RoleCode[]) =>
  (req: ParsedRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
