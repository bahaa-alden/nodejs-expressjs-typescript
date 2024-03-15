import { NextFunction, Response } from 'express';

import { RoleCode } from '../models/role.model';
import { RoleRequest } from '../types/app-request';

export default (...roleCodes: RoleCode[]) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
