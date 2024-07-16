import { boolean, object, string, TypeOf } from "zod";
import { zodObjectId } from "../middlewares/validator";
import { numericId } from "./common";

const taskIdSchema = object({
  id: zodObjectId,
});

export type ITaskIdSchema = TypeOf<typeof taskIdSchema>;

const taskAllSchema = object({
  page: numericId.optional(),
  limit: numericId.optional(),
});

export type ITaskAllSchema = TypeOf<typeof taskAllSchema>;

const taskCreateSchema = object({
  title: string().min(3).max(500),
  description: string().min(3).max(2000),
}).strict();

export type ITaskCreateSchema = TypeOf<typeof taskCreateSchema>;

const taskUpdateSchema = object({
  title: string().min(3).max(500).optional(),
  description: string().min(3).max(2000).optional(),
  completed: boolean().optional(),
}).strict();

export type ITaskUpdateSchema = TypeOf<typeof taskUpdateSchema>;

export default {
  taskId: taskIdSchema,
  taskAll: taskAllSchema,
  taskCreate: taskCreateSchema,
  taskUpdate: taskUpdateSchema,
};
