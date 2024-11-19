import { z, type TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const taskIdSchema = z.object({
  id: zodObjectId,
});

export type ITaskIdSchema = TypeOf<typeof taskIdSchema>;

const taskAllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  authorId: z.string().optional(),
  completed: z.boolean().optional(),
});

export type ITaskAllSchema = TypeOf<typeof taskAllSchema>;

const taskCreateSchema = z
  .object({
    // <creating-property-create-schema />
    title: z.string().min(3).max(500),
    description: z.string().min(3).max(2000),
  })
  .strict();

export type ITaskCreateSchema = TypeOf<typeof taskCreateSchema>;

const taskUpdateSchema = z
  .object({
    // <creating-property-update-schema />
    title: z.string().min(3).max(500).optional(),
    description: z.string().min(3).max(2000).optional(),
    completed: z.boolean().optional(),
  })
  .strict();

export type ITaskUpdateSchema = TypeOf<typeof taskUpdateSchema>;

export default {
  taskId: taskIdSchema,
  taskAll: taskAllSchema,
  taskCreate: taskCreateSchema,
  taskUpdate: taskUpdateSchema,
};
