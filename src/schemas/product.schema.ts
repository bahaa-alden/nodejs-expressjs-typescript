import { type TypeOf, z } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const productIdSchema = z.object({
  id: zodObjectId,
});

export type IProductIdSchema = TypeOf<typeof productIdSchema>;

const productAllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: z.string().optional(),
});

export type IProductAllSchema = TypeOf<typeof productAllSchema>;

const productCreateSchema = z
  .object({
    // <creating-property-create-schema />
    userIds: zodObjectId.array().optional(),
    userId: zodObjectId,
  })
  .strict();

export type IProductCreateSchema = TypeOf<typeof productCreateSchema>;

const productUpdateSchema = z
  .object({
    // <creating-property-update-schema />
    userIds: zodObjectId.array().optional(),

    userId: zodObjectId.optional(),
  })
  .strict();

export type IProductUpdateSchema = TypeOf<typeof productUpdateSchema>;

export default {
  productId: productIdSchema,
  productAll: productAllSchema,
  productCreate: productCreateSchema,
  productUpdate: productUpdateSchema,
};
