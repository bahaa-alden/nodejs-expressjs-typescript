import { CarCategory } from './../../utils/enum';
import { IUser } from './user.model';
import mongoose from 'mongoose';
import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface ICar extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  subCategory?: CarCategory;
  category?: CarCategory;
  makers: Array<IUser['_id']>;
  owners?: Array<IUser['_id']> | null;
  userId: IUser['_id'];
  title?: string | null;
  deletedAt: Date | null;
}

const carSchema: Schema = new Schema<ICar>(
  {
    // <creating-property-schema />
    subCategory: {
      type: String,
      enum: Object.values(CarCategory),
    },
    category: {
      type: String,
      enum: Object.values(CarCategory),
    },
    makers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: [],
        },
      ],
    },
    owners: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Car',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(['deletedAt', '__v', '_id'], ret),
    },
  },
);

export default model<ICar>('Car', carSchema);
