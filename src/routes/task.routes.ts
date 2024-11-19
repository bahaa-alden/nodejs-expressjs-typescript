import { Router } from 'express';
import validator from '../middlewares/validator';
import taskSchema from '../schemas/task.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { taskController } from '../controllers/task.controller';
import { authController } from '../controllers/auth.controller';
import authSchema from '../schemas/auth.schema';

export class TaskRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // protect routes
    this.router.use(
      validator({ headers: authSchema.auth }),
      authController.authenticateJWT,
    );

    // only for users
    this.router.use(restrict(RoleCode.USER));
    this.router.use(authorizationMiddleware.authorization);

    // GET ALL TASKS
    this.router.get(
      '/',
      validator({ query: taskSchema.taskAll }),
      taskController.getTasks,
    );

    // GET TASK BY ID
    this.router.get(
      '/:id',
      validator({ params: taskSchema.taskId }),
      taskController.getTask,
    );

    // CREATE TASK
    this.router.post(
      '/',
      validator({ body: taskSchema.taskCreate }),
      taskController.createTask,
    );

    // UPDATE TASK BY ID
    this.router.patch(
      '/:id',
      validator({ params: taskSchema.taskId, body: taskSchema.taskUpdate }),
      taskController.updateTask,
    );

    // DELETE TASK BY ID
    this.router.delete(
      '/:id',
      validator({ params: taskSchema.taskId }),
      taskController.deleteTask,
    );
  }
}
export const taskRoutes = new TaskRoutes();
