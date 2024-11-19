import Role, { IRole } from '../models/role.model';
import { RoleCode } from '../../utils/enum';
import { BaseRepository } from './base.repository';

export class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super(Role);
  }

  async findByCodes(codes: RoleCode[]): Promise<IRole[]> {
    return this.model.find({
      code: { $in: codes },
      status: true,
      deletedAt: null,
    });
  }
}

export const roleRepository = new RoleRepository();
