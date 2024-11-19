import { IUser } from './user.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IProduct extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  userIds?: Array<IUser['_id']>;
  users?: Array<IUser>;

  userId: IUser['_id'];
  user: IUser;

  deletedAt: Date | null;
}

const productSchema: Schema = new Schema<IProduct>(
  {
    // <creating-property-schema />
    userIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: [],
        },
      ],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Product',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(['deletedAt', '__v', '_id'], ret),
    },
  },
);

productSchema.virtual('user', {
  localField: 'userId',
  foreignField: '_id',
  ref: 'User',
  justOne: true,
});

productSchema.virtual('users', {
  localField: 'userIds',
  foreignField: '_id',
  ref: 'User',
});

export default model<IProduct>('Product', productSchema);
