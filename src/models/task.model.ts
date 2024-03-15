import { Schema, model, Types } from "mongoose";
import User from "./user.model";

export const DOCUMENT_NAME = "Task";
export const COLLECTION_NAME = "tasks";

export default interface Task {
  _id: Types.ObjectId;
  title: string;
  description: string;
  completed?: boolean;
  author: User;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Task>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    completed: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.index(
  { title: "text", description: "text" },
  { weights: { title: 3, description: 1 }, background: false }
);
schema.index({ _id: 1, status: 1 });

export const TaskModel = model<Task>(DOCUMENT_NAME, schema, COLLECTION_NAME);
