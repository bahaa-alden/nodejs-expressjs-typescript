import { NextFunction, Request, Response, ParsedRequest } from 'express';
import { ConflictError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import {
  FindUserOptions,
  userRepository,
} from '../database//repositories/user.repository';
import {
  ICreateUserSchema,
  IUserAllSchema,
  IUserIdSchema,
  IUserUpdateMeSchema,
  IUserUpdateSchema,
} from '../schemas/user.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { existRecord, needRecord } from '../utils/record';

export class UserController {
  // return authenticated user details

  public registerUser = asyncHandler(
    async (
      req: ParsedRequest<ICreateUserSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const { email, password, name, role } = req.valid.body;
      existRecord(
        await userRepository.exists(email),
        new ConflictError('User already exist'),
      );
      const user = await userRepository.insert({
        name,
        email,
        password,
        role,
      });
      res.created({
        message: 'user created',
        data: {
          user,
        },
      });
      existRecord(
        await userRepository.findByUsername(name),
        new ConflictError('User already exist'),
      );
    },
  );

  public me(req: Request, res: Response, next: NextFunction) {
    res.ok({ message: 'success', data: req.user });
  }

  public updateMe = asyncHandler(
    async (
      req: ParsedRequest<IUserUpdateMeSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const updateBody = req.valid.body;

      const user = needRecord(
        await userRepository.findById(req.user.id),
        new NotFoundError('user not found'),
      );

      if (updateBody.email && user.email !== updateBody.email) {
        existRecord(
          await userRepository.exists(updateBody.email),
          new ConflictError('User already exist'),
        );
      }

      const data = await userRepository.patchById(user.id, updateBody);

      res.ok({ message: 'User has been updated', data });
    },
  );

  public deleteMe = asyncHandler(
    async (req: ParsedRequest<void>, res: Response, next: NextFunction) => {
      await userRepository.deleteById(req.user.id);

      res.noContent({ message: 'User has been updated' });
    },
  );

  public get = asyncHandler(
    async (
      req: ParsedRequest<void, IUserAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: FindUserOptions = {
        filter: {
          //filters
          role: req.valid.query.role,
          dateFrom: req.valid.query.dateFrom,
          dateTo: req.valid.query.dateTo,
        },

        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
        search: req.valid.query.search,
      };

      const users = await userRepository.findForUser(options);
      res.ok({ message: 'success', data: users });
    },
  );

  public getOne = asyncHandler(
    async (
      req: ParsedRequest<void, void, IUserIdSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = needRecord(
        await userRepository.findById(req.valid.params.id),
        new NotFoundError('user not found'),
      );

      res.ok({ message: 'Get User Successfully', data: user });
    },
  );

  public updateOne = asyncHandler(
    async (
      req: ParsedRequest<IUserUpdateSchema, void, IUserIdSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const updateBody = req.valid.body;

      const user = needRecord(
        await userRepository.findById(req.valid.params.id),
        new NotFoundError('user not found'),
      );

      if (updateBody.email && user.email !== updateBody.email) {
        existRecord(
          await userRepository.exists(updateBody.email),
          new ConflictError('User already exist'),
        );
      }

      const data = needRecord(
        await userRepository.patchById(req.valid.params.id, updateBody),
        new NotFoundError('user not found'),
      );

      res.ok({ message: 'User has been updated', data });
    },
  );

  public deleteOne = asyncHandler(
    async (
      req: ParsedRequest<void, void, IUserIdSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = needRecord(
        await userRepository.findById(req.valid.params.id),
        new NotFoundError('user not found'),
      );

      await userRepository.deleteById(user.id);

      res.noContent({ message: 'User has been updated' });
    },
  );
}

export const userController = new UserController();
