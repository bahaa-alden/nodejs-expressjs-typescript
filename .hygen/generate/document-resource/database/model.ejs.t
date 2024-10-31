---
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
async: true
---
import { model, Schema, type Document as MongooseDocument } from 'mongoose'
import { omit } from 'lodash'

export interface I<%= name %> extends MongooseDocument {
  id: string
  deletedAt: Date | null
}

const <%= h.inflection.camelize(name, true) %>Schema: Schema = new Schema<I<%= name %>>({
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  collection: '<%= name %>',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => omit(
      ['deletedAt', '__v', '_id'],
      ret,
    ),
  },
})

export default model<I<%= name %>>('<%= name %>', <%= h.inflection.camelize(name, true) %>Schema)
