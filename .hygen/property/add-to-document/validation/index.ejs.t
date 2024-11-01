---
to: "src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts"
---
import { object, string, type TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const <%= h.inflection.camelize(name, true) %>IdSchema = object({
  id: zodObjectId,
});

export type I<%= h.inflection.capitalize(name) %>IdSchema = TypeOf<typeof <%= h.inflection.camelize(name, true) %>IdSchema>;

const <%= h.inflection.camelize(name, true) %>AllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type I<%= h.inflection.capitalize(name) %>AllSchema = TypeOf<typeof <%= h.inflection.camelize(name, true) %>AllSchema>;

const <%= h.inflection.camelize(name, true) %>CreateSchema = object({
}).strict();

export type I<%= h.inflection.capitalize(name) %>CreateSchema = TypeOf<typeof <%= h.inflection.camelize(name, true) %>CreateSchema>;

const <%= h.inflection.camelize(name, true) %>UpdateSchema = object({
}).strict();

export type I<%= h.inflection.capitalize(name) %>UpdateSchema = TypeOf<typeof <%= h.inflection.camelize(name, true) %>UpdateSchema>;

export default {
  <%= h.inflection.camelize(name, true) %>Id: <%= h.inflection.camelize(name, true) %>IdSchema,
  <%= h.inflection.camelize(name, true) %>All: <%= h.inflection.camelize(name, true) %>AllSchema,
  <%= h.inflection.camelize(name, true) %>Create: <%= h.inflection.camelize(name, true) %>CreateSchema,
  <%= h.inflection.camelize(name, true) %>Update: <%= h.inflection.camelize(name, true) %>UpdateSchema,
};
