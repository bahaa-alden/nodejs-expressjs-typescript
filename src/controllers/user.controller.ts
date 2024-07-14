import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import { InternalError, UnprocessableEntityError } from "../core/ApiError";
import { SuccessResponse } from "../core/ApiResponse";
import asyncHandler from "../helpers/asyncHandler";
import { env_vars } from "../config";
import User from "../models/user.model";
import * as _ from "lodash";
import { userRepository } from "../repositories/user.repository";
import { roleRepository } from "../repositories/role.repository.";
import { RoleCode } from "../utils/enum";
import { ProtectedRequest } from "../types/app-request";

export class UserController {
  // SignUp user handler
  public registerUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password, name } = req.body;

      const exist = await userRepository.exists(email);

      if (exist) throw new UnprocessableEntityError("User already exist");

      const role = await roleRepository.findOneBy({ code: RoleCode.USER });

      if (!role) throw new InternalError("Role must be defined");

      const user = await userRepository.insert({
        name,
        email,
        password,
        roleId: role.id,
      });

      const token = jwt.sign({ email: req.body.email }, env_vars.jwt.secret, {
        expiresIn: env_vars.jwt.accessExpiration,
      });
      new SuccessResponse("user created", {
        token,
        user: _.omit(user, ["password"]),
      }).send(res);
    }
  );

  // passport local strategy handler
  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "local",
      { session: false },
      function (err, user: User, info) {
        if (err) return next(err);
        if (user) {
          const token = jwt.sign(
            { email: req.body.email },
            env_vars.jwt.secret,
            {
              expiresIn: env_vars.jwt.accessExpiration,
            }
          );
          const userRes = _.pick(user, ["_id", "name", "email", "role"]);
          new SuccessResponse("loggenin", { token, user: userRes }).send(res);
        }
      }
    )(req, res, next);
  }

  // return authenticated user details
  public me(req: ProtectedRequest, res: Response, next: NextFunction) {
    new SuccessResponse("success", req.user).send(res);
  }
}
export const userController = new UserController();
