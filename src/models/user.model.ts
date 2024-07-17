import { Schema, model, Error, Document as MongooseDocument } from "mongoose";
import * as bcrypt from "bcrypt-nodejs";
import IRole from "./role.model";
import { omit } from "lodash";
import { Types } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface IUser extends MongooseDocument {
  id: string;
  name: string;
  email: string;
  password: string;
  role: IRole;
  roleId: IRole["_id"];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  comparePassword?(
    candidatePassword: string,
    callback: (err: Error, isMatch: boolean) => void
  ): void;
}

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    roleId: {
      type: Types.ObjectId,
      ref: "Role",
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ["__v", "_id", "password", "deletedAt"]),
    },
  }
);

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

schema.virtual("role", {
  localField: "roleId",
  foreignField: "_id",
  ref: "Role",
  justOne: true,
});

export const User = model<IUser>(DOCUMENT_NAME, schema, COLLECTION_NAME);
