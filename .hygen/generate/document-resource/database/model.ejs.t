---
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
async: true
---
import { model, Schema, type Document as MongooseDocument } from 'mongoose'
import { omit } from 'lodash'

export interface I<%= h.inflection.capitalize(name) %> extends MongooseDocument {
  id: string
  // <creating-property-interface />
  deletedAt: Date | null
}

const <%= h.inflection.camelize(name, true) %>Schema: Schema = new Schema<I<%= h.inflection.capitalize(name) %>>({
  // <creating-property-schema />
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  collection: '<%= h.inflection.pluralize(name) %>',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => omit(
      ['deletedAt', '__v', '_id'],
      ret,
    ),
  },
})

export default model<I<%= h.inflection.capitalize(name) %>>('<%= h.inflection.capitalize(name) %>', <%= h.inflection.camelize(name, true) %>Schema)
