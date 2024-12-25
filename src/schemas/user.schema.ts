import { UserStatus } from './../utils/enum';
import { z, TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const userIdSchema = z.object({
  id: zodObjectId,
});

export type IUserIdSchema = TypeOf<typeof userIdSchema>;

const userUpdateSchema = z
  .object({
    // <creating-property-update-schema />
    status: z.nativeEnum(UserStatus).optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();

export type IUserUpdateSchema = TypeOf<typeof userUpdateSchema>;

const userAllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: z.string().optional(),
});

export type IUserAllSchema = TypeOf<typeof userAllSchema>;

export default {
  userId: userIdSchema,
  updateUser: userUpdateSchema,
  userAll: userAllSchema,
};
