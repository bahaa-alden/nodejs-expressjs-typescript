import { CarCategory } from './../utils/enum';
import { type TypeOf, z } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const carIdSchema = z.object({
  id: zodObjectId,
});

export type ICarIdSchema = TypeOf<typeof carIdSchema>;

const carAllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: z.string().optional(),
});

export type ICarAllSchema = TypeOf<typeof carAllSchema>;

const carCreateSchema = z
  .object({
    // <creating-property-create-schema />
    subCategory: z.nativeEnum(CarCategory).optional(),

    category: z.nativeEnum(CarCategory).optional(),
  })
  .strict();

export type ICarCreateSchema = TypeOf<typeof carCreateSchema>;

const carUpdateSchema = z
  .object({
    // <creating-property-update-schema />
    subCategory: z.nativeEnum(CarCategory).optional(),

    category: z.nativeEnum(CarCategory).optional(),
  })
  .strict();

export type ICarUpdateSchema = TypeOf<typeof carUpdateSchema>;

export default {
  carId: carIdSchema,
  carAll: carAllSchema,
  carCreate: carCreateSchema,
  carUpdate: carUpdateSchema,
};
