import { BaseRepository } from "./base.repository";
import IUser, { User } from "../models/user.model";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findForUser(pageNumber: number, limit: number): Promise<IUser[]> {
    return await this.model
      .find({ deletedAt: null })
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .populate("role")
      .sort({ createdAt: -1 });
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
        path: "role",
        match: { status: true },
        select: { code: 1 },
      });
  }

  async findOneById(id: string): Promise<IUser | null> {
    return await this.model
      .findById(id)
      .where({ deletedAt: null })
      .select("+email +password +roleId")
      .populate({
        path: "role",
        match: { status: true },
      });
  }

  // find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model
      .findOne({ email: email })
      .where({ deletedAt: null })
      .select("+email +password +roleId +name")
      .populate({
        path: "role",
        match: { status: true },
        select: { code: 1 },
      });
  }
}
export const userRepository = new UserRepository();
