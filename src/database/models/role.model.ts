import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';
import { RoleCode } from '../../utils/enum';

export interface IRole extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  code: RoleCode;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const roleSchema = new Schema<IRole>(
  {
    // <creating-property-schema />
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
    collection: 'Role',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['__v', '_id', 'deletedAt']),
    },
  },
);

export default model<IRole>('Role', roleSchema);
