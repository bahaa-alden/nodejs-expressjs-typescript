import { ParsedRequest } from 'express';
import { AuthFailureError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { roleRepository } from '../database/repositories/role.repository';

// Authorization by role
export class AuthorizationMiddleware {
  public authorization = asyncHandler(async (req: ParsedRequest, res, next) => {
    if (!req.user || !req.user.role || !req.currentRoleCodes)
      throw new AuthFailureError('Permission denied');

    const { user } = req;
    const roles = await roleRepository.findByCodes(req.currentRoleCodes);
    if (!roles) throw new AuthFailureError('Permission denied');
    let authorized = false;
    roles.forEach((role) => {
      if (role.code === user.role.code) {
        authorized = true;
        return;
      }
    });
    if (!authorized) throw new AuthFailureError('Permission denied');

    return next();
  });
}
export const authorizationMiddleware = new AuthorizationMiddleware();
