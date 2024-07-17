import { Response } from "express";
import { InternalError, NotFoundError } from "../core/ApiError";
import { SuccessResponse } from "../core/ApiResponse";
import asyncHandler from "../middlewares/asyncHandler";
import { NextFunction } from "express-serve-static-core";
import { taskRepository } from "../repositories/task.repository.";
import { ParsedRequest } from "app-request";
import {
  ITaskAllSchema,
  ITaskIdSchema,
  ITaskCreateSchema,
  ITaskUpdateSchema,
} from "../schemas/task.schema";

export class TaskController {
  // get all tasks handler by author
  public getTasks = asyncHandler(
    async (
      req: ParsedRequest<void, ITaskAllSchema>,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { page, limit } = req.valid.query;
      const tasks = await taskRepository.findForAuthor(
        page,
        limit,
        req.user.id
      );

      res.ok({ message: "success", data: tasks });
    }
  );

  // get task handler by Id for authenticated user
  public getTask = asyncHandler(
    async (
      req: ParsedRequest<void, void, ITaskIdSchema>,
      res: Response
    ): Promise<void> => {
      const task = await taskRepository.findByIdForAuthor(
        req.valid.params.id,
        req.user.id
      );

      if (task === null) {
        throw new NotFoundError("Task not Found");
      }
      res.ok({ message: "success", data: task });
    }
  );

  //  create task handler
  public createTask = asyncHandler(
    async (
      req: ParsedRequest<ITaskCreateSchema>,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const newTask = { ...req.valid.body, authorId: req.user.id };
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
      req: ParsedRequest<ITaskUpdateSchema, void, ITaskIdSchema>,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const task = await taskRepository.findByIdForAuthor(
        req.valid.params.id,
        req.user.id
      );
      if (task === null) {
        throw new NotFoundError("Task not Found");
      }

      const data = await taskRepository.patchById(task.id, updateBody);

      res.ok({ message: "Task has been updated", data });
    }
  );

  // delete task handler by Id for authenticated user
  public deleteTask = asyncHandler(
    async (
      req: ParsedRequest<void, void, ITaskIdSchema>,
      res: Response
    ): Promise<void> => {
      const task = await taskRepository.findByIdForAuthor(
        req.valid.params.id,
        req.user.id
      );
      if (task === null) {
        throw new NotFoundError("Task not Found");
      }
      await taskRepository.deleteById(task.id);
      res.noContent({ message: "Task deleted Successfully" });
    }
  );
}

export const taskController = new TaskController();
