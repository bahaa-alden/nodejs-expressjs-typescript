import { Schema, model, Error } from "mongoose";
import * as bcrypt from "bcrypt-nodejs";
import Role from "./role.model";

import { Types } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User {
  _id?: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword?(candidatePassword: string, callback: any);
}

const schema = new Schema<User>(
  {
    name: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
      select: false,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.index({ _id: 1 });
schema.index({ email: 1 });

// hash password before save user
schema.pre("save", function save(next) {
  const user = this;
  if (!this.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, undefined, (err: Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// check password
schema.methods.comparePassword = function (
  candidatePassword: string,
  callback: any
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: Error, isMatch: boolean) => {
      callback(err, isMatch);
    }
  );
};

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
