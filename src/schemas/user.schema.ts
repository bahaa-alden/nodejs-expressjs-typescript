import { object, string, TypeOf } from "zod";
import { zodObjectId } from "../middlewares/validator";
import { orderColumn, orderDirection, page, pageSize } from "./common";

const userIdSchema = object({
  id: zodObjectId,
});

export type IUserIdSchema = TypeOf<typeof userIdSchema>;

const userUpdateSchema = object({
  name: string().optional(),
  email: string().email().optional(),
}).strict();

export type IUserUpdateSchema = TypeOf<typeof userUpdateSchema>;

const userAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type IUserAllSchema = TypeOf<typeof userAllSchema>;

export default {
  userId: userIdSchema,
  updateUser: userUpdateSchema,
  userAll: userAllSchema,
};
