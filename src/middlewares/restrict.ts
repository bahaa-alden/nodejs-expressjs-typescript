import { NextFunction, Response, ParsedRequest } from 'express';
import { RoleCode } from '../utils/enum';

export default (...roleCodes: RoleCode[]) =>
  (req: ParsedRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
