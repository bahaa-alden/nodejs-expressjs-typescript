import { Router } from "express";
import validator, { ValidationSource } from "../helpers/validator";
import taskSchema from "../schemas/task.schema";
import restrict from "../helpers/restrict";
import { RoleCode } from "../utils/enum";
import authSchema from "../schemas/auth.schema";
import { authController } from "../controllers/auth.controller";
import { authorizationMiddleware } from "../auth/authorization";
import { taskController } from "../controllers/task.controller";

export class TaskRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // protect routes
    this.router.use(
      validator(authSchema.auth, ValidationSource.HEADER),
      authController.authenticateJWT
    );

    // only for users
    this.router.use(restrict(RoleCode.USER));
    this.router.use(authorizationMiddleware.authorization);

    // GET ALL TASKS
    this.router.get(
      "/",
      validator(taskSchema.taskAll, ValidationSource.QUERY),
      taskController.getTasks
    );

    // GET TASK BY ID
    this.router.get(
      "/:id",
      validator(taskSchema.taskId, ValidationSource.PARAM),
      taskController.getTask
    );

    // CREATE TASK
    this.router.post(
      "/",
      validator(taskSchema.taskCreate),
      taskController.createTask
    );

    // UPDATE TASK BY ID
    this.router.patch(
      "/:id",
      validator(taskSchema.taskId, ValidationSource.PARAM),
      taskController.updateTask
    );

    // DELETE TASK BY ID
    this.router.delete(
      "/:id",
      validator(taskSchema.taskId, ValidationSource.PARAM),
      taskController.deleteTask
    );
  }
}
export const taskRoutes = new TaskRoutes();
