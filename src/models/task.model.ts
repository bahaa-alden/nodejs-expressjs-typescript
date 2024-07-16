import { Schema, model, Document as MongooseDocument } from "mongoose";
import IUser from "./user.model";
import { omit } from "lodash";

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
}

const schema = new Schema<ITask>(
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
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ["__v", "_id"]),
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
