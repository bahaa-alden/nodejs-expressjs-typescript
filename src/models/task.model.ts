import { Schema, model, Document as MongooseDocument } from "mongoose";
import IUser from "./user.model";
import { omit } from "lodash";
import { Types } from "mongoose";

export const DOCUMENT_NAME = "Task";
export const COLLECTION_NAME = "tasks";

export default interface ITask extends MongooseDocument {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  authorId: IUser["_id"];
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const schema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    authorId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ["__v", "_id", "deletedAt"]),
    },
  }
);

schema.index(
  { title: "text", description: "text" },
  { weights: { title: 3, description: 1 }, background: false }
);

schema.index({ status: 1 });

schema.virtual("author", {
  localField: "authorId",
  foreignField: "_id",
  ref: "User",
  justOne: true,
});

export const Task = model<ITask>(DOCUMENT_NAME, schema, COLLECTION_NAME);
