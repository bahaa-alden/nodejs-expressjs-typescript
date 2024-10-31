import { model, Schema, type Document as MongooseDocument } from 'mongoose'
import { omit } from 'lodash'

export interface ICar extends MongooseDocument {
  id: string
  deletedAt: Date | null
}

const carSchema: Schema = new Schema<ICar>({
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  collection: 'Car',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => omit(
      ['deletedAt', '__v', '_id'],
      ret,
    ),
  },
})

export default model<ICar>('Car', carSchema)
