import { Schema, model, Document as MongooseDocument } from "mongoose";
import { RoleCode } from "../utils/enum";

export const DOCUMENT_NAME = "Role";
export const COLLECTION_NAME = "roles";

export default interface IRole extends MongooseDocument {
  id: string;
  code: RoleCode;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IRole>(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(RoleCode),
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.index({ code: 1, status: 1 });

export const Role = model<IRole>(DOCUMENT_NAME, schema, COLLECTION_NAME);
