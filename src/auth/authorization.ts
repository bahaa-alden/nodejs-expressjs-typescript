import { AuthFailureError } from "../core/ApiError";
import asyncHandler from "../helpers/asyncHandler";
import { roleRepository } from "../repositories/role.repository.";
import { ProtectedRequest } from "../types/app-request";

// Authorization by role
export class Authorization {
  public authorization = asyncHandler(
    async (req: ProtectedRequest, res, next) => {
      if (!req.user || !req.user.role || !req.currentRoleCodes)
        throw new AuthFailureError("Permission denied");

      const { user } = req;
      const roles = await roleRepository.findByCodes(req.currentRoleCodes);
      if (!roles) throw new AuthFailureError("Permission denied");
      let authorized = false;
      roles.forEach((role) => {
        if (role.code === user.role.code) {
          authorized = true;
          return;
        }
      });
      if (!authorized) throw new AuthFailureError("Permission denied");

      return next();
    }
  );
}
