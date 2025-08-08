import { RoleCode } from './../../utils/enum';
import { BaseRepository, FindOptions } from './base.repository';
import { OrderDirection, OrderOptions } from '../../utils/order';
import { FilterQuery } from 'mongoose';
import User, { IUser } from '../models/user.model';
import { startOfDay, endOfDay } from 'date-fns';

export interface UserOrderOptions extends OrderOptions {
  column: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserFilterOptions {
  //filters
  dateFrom?: Date;
  dateTo?: Date;
  role?: RoleCode;
}

export interface FindUserOptions extends FindOptions<UserFilterOptions> {
  order: UserOrderOptions;
}

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findForUser(options: FindUserOptions): Promise<IUser[]> {
    const { pagination, order, search, filter } = options;
    const query: FilterQuery<IUser> = { deletedAt: null };

    if (filter?.role) {
      query.role = filter.role;
    }

    if (filter?.dateFrom ?? filter?.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = startOfDay(filter.dateFrom);
      }
      if (filter.dateTo) {
        query.createdAt.$lte = endOfDay(filter.dateTo);
      }
    }

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
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      });
  }

  async exists(email: string): Promise<boolean> {
    const doc = await this.model.findOne({ email }).where({ deletedAt: null });
    if (doc === null) {
      return false;
    }
    return true;
  }

  async existsName(name: string): Promise<boolean> {
    const doc = await this.model.findOne({ name }).where({ deletedAt: null });
    if (doc === null) {
      return false;
    }
    return true;
  }

  async findPrivateProfileById(id: string): Promise<IUser | null> {
    return await this.model.findById(id).where({ deletedAt: null });
  }

  async findOneById(id: string): Promise<IUser | null> {
    return await this.model.findById(id).where({ deletedAt: null });
  }

  // find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email }).where({ deletedAt: null });
  }

  async findByUsername(name: string): Promise<IUser | null> {
    return await this.model.findOne({ name }).where({ deletedAt: null });
  }
}
export const userRepository = new UserRepository();
