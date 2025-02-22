import { NextFunction, Request, Response, ParsedRequest } from 'express';
import { ConflictError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import {
  FindUserOptions,
  userRepository,
} from '../database//repositories/user.repository';
import {
  IUserAllSchema,
  IUserIdSchema,
  IUserUpdateSchema,
} from '../schemas/user.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { existRecord, needRecord } from '../utils/record';

export class UserController {
  // return authenticated user details
  public me(req: Request, res: Response, next: NextFunction) {
    res.ok({ message: 'success', data: req.user });
  }

  public async updateMe(
    req: ParsedRequest<IUserUpdateSchema>,
    res: Response,
    next: NextFunction,
  ) {
    const updateBody = req.valid.body;

    if (updateBody.email) {
      existRecord(
        await userRepository.exists(updateBody.email),
        new ConflictError('User already exist'),
      );
    }

    const data = await userRepository.patchById(req.user.id, updateBody);

    res.ok({ message: 'User has been updated', data });
  }

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
        filter: {},
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

      if (updateBody.email) {
        existRecord(
          await userRepository.exists(updateBody.email),
          new ConflictError('User already exist'),
        );
      }

      const data = await userRepository.patchById(req.user.id, updateBody);

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
