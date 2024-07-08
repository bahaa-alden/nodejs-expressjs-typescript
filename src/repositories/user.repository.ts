import { BaseRepository } from "./base.repository";
import IUser, { User } from "../models/user.model";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async exists(email: string): Promise<boolean> {
    const doc = await this.model.findOne({ email: email });
    if (doc === null) {
      return false;
    }
    return true;
  }

  async findPrivateProfileById(id: string): Promise<IUser | null> {
    return this.model.findById(id).populate({
      path: "role",
      match: { status: true },
      select: { code: 1 },
    });
  }

  async findOneById(id: string): Promise<IUser | null> {
    return this.model
      .findById({ _id: id })
      .select("+email +password +role")
      .populate({
        path: "role",
        match: { status: true },
      });
  }

  // find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return this.model
      .findOne({ email: email })
      .select("+email +password +role +name")
      .populate({
        path: "role",
        match: { status: true },
        select: { code: 1 },
      });
  }
}
export const userRepository = new UserRepository();
