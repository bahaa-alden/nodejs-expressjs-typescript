import { Router } from "express";
import validator, { ValidationSource } from "../helpers/validator";
import authSchema from "../schemas/auth.schema";
import { userController } from "../controllers/user.controller";
import { authController } from "../controllers/auth.controller";

export class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    // ME
    this.router.get(
      "/me",
      validator(authSchema.auth, ValidationSource.HEADER),
      authController.authenticateJWT,
      userController.me
    );

    // REGISTER
    this.router.post(
      "/register",
      validator(authSchema.signup),
      userController.registerUser
    );

    // LOGIN
    this.router.post(
      "/login",
      validator(authSchema.credential),
      userController.authenticateUser
    );
  }
}
export const userRoutes = new UserRoutes();
