import { Schema, model, Document as MongooseDocument } from "mongoose";
import { RoleCode } from "../utils/enum";
import { omit } from "lodash";

export const DOCUMENT_NAME = "Role";
export const COLLECTION_NAME = "roles";

export default interface IRole extends MongooseDocument {
  id: string;
  code: RoleCode;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const schema = new Schema<IRole>(
  {
    code: {
      type: String,
      required: true,
      enum: Object.values(RoleCode),
    },
    status: {
      type: Boolean,
      default: true,
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
      transform: (_, ret) => omit(ret, ["__v", "_id", "deletedAt"]),
    },
  }
);

export const Role = model<IRole>(DOCUMENT_NAME, schema, COLLECTION_NAME);
