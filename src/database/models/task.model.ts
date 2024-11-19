import {
  model,
  Schema,
  Types,
  type Document as MongooseDocument,
} from 'mongoose';
import { omit } from 'lodash';
import { IUser } from './user.model';

export interface ITask extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  title: string;
  description: string;
  completed: boolean;
  authorId: IUser['_id'];
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const taskSchema = new Schema<ITask>(
  {
    // <creating-property-schema />
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
      ref: 'User',
      required: true,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Task',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['__v', '_id', 'deletedAt']),
    },
  },
);

taskSchema.index(
  { title: 'text', description: 'text' },
  { weights: { title: 3, description: 1 }, background: false },
);

taskSchema.index({ status: 1 });

taskSchema.virtual('author', {
  localField: 'authorId',
  foreignField: '_id',
  ref: 'User',
  justOne: true,
});

export default model<ITask>('Task', taskSchema);
