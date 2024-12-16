---
to: "src/schemas/<%= nameDash %>.schema.ts"
---
import { object, z, string, type TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const <%= name %>IdSchema = object({
  id: zodObjectId,
});

export type I<%= Name %>IdSchema = TypeOf<typeof <%= name %>IdSchema>;

const <%= name %>AllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type I<%= Name %>AllSchema = TypeOf<typeof <%= name %>AllSchema>;

const <%= name %>CreateSchema = object({
  // <creating-property-create-schema />
}).strict();

export type I<%= Name %>CreateSchema = TypeOf<typeof <%= name %>CreateSchema>;

const <%= name %>UpdateSchema = object({
  // <creating-property-update-schema />
}).strict();

export type I<%= Name %>UpdateSchema = TypeOf<typeof <%= name %>UpdateSchema>;

export default {
  <%= name %>Id: <%= name %>IdSchema,
  <%= name %>All: <%= name %>AllSchema,
  <%= name %>Create: <%= name %>CreateSchema,
  <%= name %>Update: <%= name %>UpdateSchema,
};
