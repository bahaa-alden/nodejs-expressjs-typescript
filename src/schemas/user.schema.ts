import { RoleCode, UserStatus } from './../utils/enum';
import { z, TypeOf } from 'zod';
import {
  objectId,
  orderColumn,
  orderDirection,
  page,
  pageSize,
  stringToDate,
} from './common';

const userIdSchema = z.object({
  id: objectId,
});

export type IUserIdSchema = TypeOf<typeof userIdSchema>;

const userUpdateSchema = z
  .object({
    // <creating-property-update-schema />
    balance: z.number().optional().optional(),
    status: z.nativeEnum(UserStatus).optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z.nativeEnum(RoleCode).optional(),
  })
  .strict();

export type IUserUpdateSchema = TypeOf<typeof userUpdateSchema>;

const userUpdateMeSchema = z
  .object({
    // <creating-property-update-schema />
    name: z.string().optional(),
    email: z.string().email().optional(),
  })

  .strict();

export type IUserUpdateMeSchema = TypeOf<typeof userUpdateMeSchema>;

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(RoleCode).optional(),
  balance: z.number().optional(),
});

export type ICreateUserSchema = TypeOf<typeof createUserSchema>;

const userAllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: z.string().optional(),
  role: z.nativeEnum(RoleCode).optional(),
  dateFrom: stringToDate.optional(),
  dateTo: stringToDate.optional(),
});

export type IUserAllSchema = TypeOf<typeof userAllSchema>;

export default {
  userId: userIdSchema,
  updateUser: userUpdateSchema,
  updateMeSchema: userUpdateMeSchema,
  userAll: userAllSchema,
  createUser: createUserSchema,
};
