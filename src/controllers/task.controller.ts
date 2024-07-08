import { Response } from "express";
import { PaginateRequest, ProtectedRequest } from "../types/app-request";
import Task from "../models/task.model";
import { InternalError, NotFoundError } from "../core/ApiError";
import { NoContentMsgResponse, SuccessResponse } from "../core/ApiResponse";
import asyncHandler from "../helpers/asyncHandler";
import { NextFunction } from "express-serve-static-core";
import { taskRepository } from "../repositories/task.repository.";

export class TaskController {
  // get all tasks handler by author
  public getTasks = asyncHandler(
    async (
      req: PaginateRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { page, limit } = req.query;
      const tasks = await taskRepository.findForAuthor(
        page,
        limit,
        req.user.id
      );

      new SuccessResponse("success", tasks).send(res);
    }
  );

  // get task handler by Id for authenticated user
  public getTask = asyncHandler(
    async (req: ProtectedRequest, res: Response): Promise<void> => {
      const task = await taskRepository.findByIdForAuthor(
        req.params.id,
        req.user.id
      );

      if (task === null) {
        throw new NotFoundError("Task not Found");
      }
      new SuccessResponse("success", task).send(res);
    }
  );

  //  create task handler
  public createTask = asyncHandler(
    async (
      req: ProtectedRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const newTask: Task = req.body;
      newTask.authorId = req.user;
      const task = await taskRepository.insert(newTask);
      if (task === null) {
        throw new InternalError();
      }
      new SuccessResponse("success", task).send(res);
    }
  );

  // update task handler by Id for authenticated user

  public updateTask = asyncHandler(
    async (
      req: ProtectedRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const updateBody: Task = req.body;

      const task = await taskRepository.findByIdForAuthor(
        req.params.id,
        req.user.id
      );
      if (task === null) {
        throw new NotFoundError("Task not Found");
      }

      const data = await taskRepository.patchById(task.id, updateBody);

      new SuccessResponse("Task has been updated", data).send(res);
    }
  );

  // delete task handler by Id for authenticated user
  public deleteTask = asyncHandler(
    async (req: ProtectedRequest, res: Response): Promise<void> => {
      const task = await taskRepository.findByIdForAuthor(
        req.params.id,
        req.user.id
      );
      if (task === null) {
        throw new NotFoundError("Task not Found");
      }
      await taskRepository.deleteById(task.id);
      new NoContentMsgResponse("Task deleted Successfully").send(res);
    }
  );
}
