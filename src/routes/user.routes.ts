import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import validator from "../helpers/validator";
import authSchema from "../schemas/auth.schema";

export class UserRoutes {
  router: Router;
  public userController: UserController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    // REGISTER
    this.router.post(
      "/register",
      validator(authSchema.signup),
      this.userController.registerUser
    );

    // LOGIN
    this.router.post(
      "/login",
      validator(authSchema.credential),
      this.userController.authenticateUser
    );
  }
}
