---
to: src/database/models/<%= nameDash %>.model.ts
async: true
---
import { model, Schema, type Document as MongooseDocument } from 'mongoose'
import { omit } from 'lodash'

export interface I<%= Name %> extends MongooseDocument {
  id: string
  // <creating-property-interface />
  deletedAt: Date | null
}

const <%= name %>Schema: Schema = new Schema<I<%= Name %>>({
  // <creating-property-schema />
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  collection: '<%= Name %>',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => omit(
      ['deletedAt', '__v', '_id'],
      ret,
    ),
  },
})

export default model<I<%= Name %>>('<%= Name %>', <%= name %>Schema)
