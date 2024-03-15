import User, { UserModel } from "../models/user.model";
import { InternalError } from "../core/ApiError";
import { Types } from "mongoose";
import { RoleModel } from "../models/role.model";
import * as _ from "lodash";

export class UserRepo {
  // check if user exits
  async exists(email: string): Promise<boolean> {
    const user = await UserModel.exists({ email: email });
    return user;
  }

  // find user by id without email
  async findPrivateProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id })
      .select("+email")
      .populate({
        path: "role",
        match: { status: true },
        select: { code: 1 },
      });
  }

  // find user by id
  async findOneById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id })
      .select("+email +password +role")
      .populate({
        path: "role",
        match: { status: true },
      });
  }

  // find user by email
  async findOneByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email })
      .select("+email +password +role +name")
      .populate({
        path: "role",
        match: { status: true },
        select: { code: 1 },
      });
  }

  // create user
  async create(user: User, roleCode: string): Promise<{ user: User }> {
    const role = await RoleModel.findOne({ code: roleCode }).select("+code");

    if (!role) throw new InternalError("Role must be defined");

    user.role = role;
    const createdUser = await UserModel.create(user);

    return {
      user: {
        ...createdUser.toObject(),
        role: _.pick(user.role, ["_id", "code"]),
      },
    };
  }
}
