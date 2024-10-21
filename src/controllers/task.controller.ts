import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  FindTaskOptions,
  taskRepository,
} from '../repositories/task.repository.';
import {
  ITaskAllSchema,
  ITaskIdSchema,
  ITaskCreateSchema,
  ITaskUpdateSchema,
} from '../schemas/task.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class TaskController {
  // get all tasks handler by author
  public getTasks = asyncHandler(
    async (
      req: ParsedRequest<void, ITaskAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: FindTaskOptions = {
        filter: {
          authorId:
            req.user.role.code === RoleCode.USER
              ? req.user.id
              : req.valid.query.authorId,
        },
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
      };
      const tasks = await taskRepository.findForAuthor(options);

      res.ok({ message: 'success', data: tasks });
    },
  );

  // get task handler by Id for authenticated user
  public getTask = asyncHandler(
    async (
      req: ParsedRequest<void, void, ITaskIdSchema>,
      res: Response,
    ): Promise<void> => {
      const task = needRecord(
        await taskRepository.findByIdForAuthor(
          req.valid.params.id,
          req.user.id,
        ),
        new NotFoundError('Task not Found'),
      );

      res.ok({ message: 'success', data: task });
    },
  );

  //  create task handler
  public createTask = asyncHandler(
    async (
      req: ParsedRequest<ITaskCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newTask = { ...req.valid.body, authorId: req.user.id };
      const task = await taskRepository.insert(newTask);
      if (task === null) {
        throw new InternalError();
      }
      res.created({ message: 'Task has been created', data: task });
    },
  );

  // update task handler by Id for authenticated user

  public updateTask = asyncHandler(
    async (
      req: ParsedRequest<ITaskUpdateSchema, void, ITaskIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const task = needRecord(
        await taskRepository.findByIdForAuthor(
          req.valid.params.id,
          req.user.id,
        ),
        new NotFoundError('Task not Found'),
      );

      const data = await taskRepository.patchById(task.id, updateBody);

      res.ok({ message: 'Task has been updated', data });
    },
  );

  // delete task handler by Id for authenticated user
  public deleteTask = asyncHandler(
    async (
      req: ParsedRequest<void, void, ITaskIdSchema>,
      res: Response,
    ): Promise<void> => {
      const task = needRecord(
        await taskRepository.findByIdForAuthor(
          req.valid.params.id,
          req.user.id,
        ),
        new NotFoundError('Task not Found'),
      );

      await taskRepository.deleteById(task.id);
      res.noContent({ message: 'Task deleted Successfully' });
    },
  );
}

export const taskController = new TaskController();
