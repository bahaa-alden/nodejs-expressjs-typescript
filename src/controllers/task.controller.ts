import { Response } from "express";
import { PaginateRequest, ProtectedRequest } from "../types/app-request";
import { TaskRepo } from "../repository/task.repo";
import Task from "../models/task.model";
import { InternalError, NotFoundError } from "../core/ApiError";
import { NoContentMsgResponse, SuccessResponse } from "../core/ApiResponse";
import asyncHandler from "../helpers/asyncHandler";
import { NextFunction } from "express-serve-static-core";

export class TaskController {
  public taskRepo: TaskRepo = new TaskRepo();

  // get all tasks handler by author
  public getTasks = asyncHandler(
    async (
      req: PaginateRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { page, limit } = req.query;
      const tasks = await this.taskRepo.findAllForAuthor(
        page,
        limit,
        req.user._id
      );

      new SuccessResponse("success", tasks).send(res);
    }
  );

  // get task handler by Id for authenticated user
  public getTask = asyncHandler(
    async (req: ProtectedRequest, res: Response): Promise<void> => {
      const task = await this.taskRepo.findOneById(req.params.id, req.user._id);
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
      newTask.author = req.user;
      const task = await this.taskRepo.create(newTask);
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
      const task = await this.taskRepo.update(
        req.params.id,
        updateBody,
        req.user._id
      );
      if (task === null) {
        throw new NotFoundError("Task not Found");
      }
      new SuccessResponse("Task has been updated", task).send(res);
    }
  );

  // delete task handler by Id for authenticated user
  public deleteTask = asyncHandler(
    async (req: ProtectedRequest, res: Response): Promise<void> => {
      const task = await this.taskRepo.delete(req.params.id, req.user._id);
      if (task === null) {
        throw new NotFoundError("Task not Found");
      }
      new NoContentMsgResponse("Task deleted Successfully").send(res);
    }
  );
}
