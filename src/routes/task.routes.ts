import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { AuthController } from "../controllers/auth.controller";
import validator, { ValidationSource } from "../helpers/validator";
import taskSchema from "../schemas/task.schema";
import { Authorization } from "../auth/authorization";
import restrict from "../helpers/restrict";
import { RoleCode } from "../models/role.model";

export class TaskRoutes {
  public router: Router;
  public taskController: TaskController = new TaskController();
  public authController: AuthController = new AuthController();
  public authorization = new Authorization();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // protect routes
    this.router.use(this.authController.authenticateJWT);

    // only for users
    this.router.use(restrict(RoleCode.USER));
    this.router.use(this.authorization.authorization);

    // GET ALL TASKS
    this.router.get(
      "/",
      validator(taskSchema.taskAll, ValidationSource.QUERY),
      this.taskController.getTasks
    );

    // GET TASK BY ID
    this.router.get(
      "/:id",
      validator(taskSchema.taskId, ValidationSource.PARAM),
      this.taskController.getTask
    );

    // CREATE TASK
    this.router.post(
      "/",
      this.authController.authenticateJWT,
      validator(taskSchema.taskCreate),
      this.taskController.createTask
    );

    // UPDATE TASK BY ID
    this.router.put(
      "/:id",
      validator(taskSchema.taskId, ValidationSource.PARAM),
      this.authController.authenticateJWT,
      this.taskController.updateTask
    );

    // DELETE TASK BY ID
    this.router.delete(
      "/:id",
      validator(taskSchema.taskId, ValidationSource.PARAM),
      this.authController.authenticateJWT,
      this.taskController.deleteTask
    );
  }
}
