---
to: "src/schemas/<%= nameDash %>.schema.ts"
---
import { z, type TypeOf } from 'zod';
import { objectId, orderColumn, orderDirection, page, pageSize } from './common';

const <%= name %>IdSchema = z.object({
  id: objectId,
});

export type I<%= Name %>IdSchema = TypeOf<typeof <%= name %>IdSchema>;

const <%= name %>AllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: z.string().optional(),
  fields: z.string().optional(),
});

export type I<%= Name %>AllSchema = TypeOf<typeof <%= name %>AllSchema>;

const <%= name %>CreateSchema = z.object({
  // <creating-property-create-schema />
}).strict();

export type I<%= Name %>CreateSchema = TypeOf<typeof <%= name %>CreateSchema>;

const <%= name %>UpdateSchema = z.object({
  // <creating-property-update-schema />
}).strict();

export type I<%= Name %>UpdateSchema = TypeOf<typeof <%= name %>UpdateSchema>;

export default {
  <%= name %>Id: <%= name %>IdSchema,
  <%= name %>All: <%= name %>AllSchema,
  <%= name %>Create: <%= name %>CreateSchema,
  <%= name %>Update: <%= name %>UpdateSchema,
};
