import { model, Schema, type Document as MongooseDocument } from 'mongoose'
import { omit } from 'lodash'

export interface Icar extends MongooseDocument {
  id: string
  // <creating-property-interface />
  deletedAt: Date | null
}

const carSchema: Schema = new Schema<Icar>({
  // <creating-property-schema />
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  collection: 'car',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => omit(
      ['deletedAt', '__v', '_id'],
      ret,
    ),
  },
})

export default model<Icar>('car', carSchema)
