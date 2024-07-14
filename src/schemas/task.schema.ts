import { boolean, number, object, string } from "zod";
import { zodObjectId } from "../helpers/validator";

const taskIdSchema = object({
  id: zodObjectId,
});

const taskAllSchema = object({
  page: number().min(1).optional(),
  limit: number().min(1).optional(),
});

const taskCreateSchema = object({
  title: string().min(3).max(500),
  description: string().min(3).max(2000),
});

const taskUpdateSchema = object({
  title: string().min(3).max(500).optional(),
  description: string().min(3).max(2000).optional(),
  completed: boolean().optional(),
});

export default {
  taskId: taskIdSchema,
  taskAll: taskAllSchema,
  taskCreate: taskCreateSchema,
  taskUpdate: taskUpdateSchema,
};
