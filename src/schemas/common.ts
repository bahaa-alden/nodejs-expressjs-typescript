import { z } from 'zod';
import { OrderDirection } from '../utils/order';

const numericIdRegex = /^\d+$/u;

export const numericId = z.string().regex(numericIdRegex).transform(Number);

const positiveIntegerRegex = /^[1-9]\d*$/u;
const objectIdRegex = /^[0-9a-fA-F]{24}$/u;
const referenceIdRegex = /^\d{9}$/u;

export const objectId = z.string().regex(objectIdRegex);

export const referenceId = z.string().regex(referenceIdRegex);

export const positiveInteger = z
  .string()
  .regex(positiveIntegerRegex)
  .transform(Number);

export const uuid = z.string().uuid();

export const page = numericId
  .optional()
  .default('1')
  .refine((number) => number >= 0);

export const pageSize = numericId
  .optional()
  .default('100')
  .refine((number) => number > 0);

export const orderColumn = z
  .enum(['id', 'createdAt'])
  .optional()
  .default('createdAt');

export const orderDirection = z
  .nativeEnum(OrderDirection)
  .optional()
  .default(OrderDirection.desc);

export const localStringSchema = z.object({
  ar: z.string().optional(),
  en: z.string().optional(),
});
