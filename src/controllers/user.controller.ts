import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import { UserRepo } from "../repository/user.repo";
import { UnprocessableEntityError } from "../core/ApiError";
import { RoleCode } from "../models/role.model";
import { SuccessResponse } from "../core/ApiResponse";
import asyncHandler from "../helpers/asyncHandler";
import { env_vars } from "../config";
import User from "../models/user.model";
import * as _ from "lodash";

export class UserController {
  userRepo = new UserRepo();

  // SignUp user handler
  public registerUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password, name } = req.body;
      const exist = await this.userRepo.exists(email);
      if (exist) throw new UnprocessableEntityError("User already exist");
      const { user } = await this.userRepo.create(
        { email, password, name },
        RoleCode.USER
      );
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
}
