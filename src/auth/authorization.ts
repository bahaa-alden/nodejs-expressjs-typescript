import { AuthFailureError } from "../core/ApiError";
import asyncHandler from "../helpers/asyncHandler";
import { RoleRepo } from "../repository/role.repo";
import { ProtectedRequest } from "../types/app-request";

// Authorization by role
export class Authorization {
  roleRepo = new RoleRepo();
  public authorization = asyncHandler(
    async (req: ProtectedRequest, res, next) => {
      if (!req.user || !req.user.role || !req.currentRoleCodes)
        throw new AuthFailureError("Permission denied");

      const { user } = req;
      const roles = await this.roleRepo.findByCodes(req.currentRoleCodes);
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
