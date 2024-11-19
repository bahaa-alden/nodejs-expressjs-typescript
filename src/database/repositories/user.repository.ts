import { BaseRepository, FindOptions } from './base.repository';
import { OrderDirection, OrderOptions } from '../../utils/order';
import { FilterQuery } from 'mongoose';
import User, { IUser } from '../models/user.model';

export interface UserOrderOptions extends OrderOptions {
  column: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserFilterOptions {}

export interface FindUserOptions extends FindOptions<UserFilterOptions> {
  order: UserOrderOptions;
}

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findForUser(options: FindUserOptions): Promise<IUser[]> {
    const { pagination, order, search } = options;
    const query: FilterQuery<IUser> = { deletedAt: null };

    if (search) {
      query.$or = [
        { email: { $regex: new RegExp(search, 'i') } },
        { name: { $regex: new RegExp(search, 'i') } },
      ];
    }

    return await this.model
      .find(query)
      .skip(pagination.pageSize * (pagination.page - 1))
      .limit(pagination.pageSize)
      .populate('role')
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      });
  }

  async exists(email: string): Promise<boolean> {
    const doc = await this.model
      .findOne({ email: email })
      .where({ deletedAt: null });
    if (doc === null) {
      return false;
    }
    return true;
  }

  async findPrivateProfileById(id: string): Promise<IUser | null> {
    return await this.model
      .findById(id)
      .where({ deletedAt: null })
      .populate({
        path: 'role',
        match: { status: true },
        select: { code: 1 },
      });
  }

  async findOneById(id: string): Promise<IUser | null> {
    return await this.model
      .findById(id)
      .where({ deletedAt: null })
      .select('+email +password +roleId')
      .populate({
        path: 'role',
        match: { status: true },
      });
  }

  // find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model
      .findOne({ email: email })
      .where({ deletedAt: null })
      .select('+email +password +roleId +name')
      .populate({
        path: 'role',
        match: { status: true },
        select: { code: 1 },
      });
  }
}
export const userRepository = new UserRepository();
