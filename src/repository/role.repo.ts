import Role, { RoleModel } from "../models/role.model";

export class RoleRepo {
  async findByCodes(codes: string[]): Promise<Role[]> {
    return RoleModel.find({ code: { $in: codes }, status: true });
  }
}
