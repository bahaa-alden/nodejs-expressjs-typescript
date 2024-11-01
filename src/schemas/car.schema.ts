import { object, string, type TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const carIdSchema = object({
  id: zodObjectId,
});

export type ICarIdSchema = TypeOf<typeof carIdSchema>;

const carAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type ICarAllSchema = TypeOf<typeof carAllSchema>;

const carCreateSchema = object({
  // <creating-property-create-schema />
}).strict();

export type ICarCreateSchema = TypeOf<typeof carCreateSchema>;

const carUpdateSchema = object({
  // <creating-property-update-schema />
}).strict();

export type ICarUpdateSchema = TypeOf<typeof carUpdateSchema>;

export default {
  carId: carIdSchema,
  carAll: carAllSchema,
  carCreate: carCreateSchema,
  carUpdate: carUpdateSchema,
};
