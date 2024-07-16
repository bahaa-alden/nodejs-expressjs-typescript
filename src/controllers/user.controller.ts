import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import { InternalError, UnprocessableEntityError } from "../core/ApiError";
import asyncHandler from "../middlewares/asyncHandler";
import { env_vars } from "../config";
import User from "../models/user.model";
import * as _ from "lodash";
import { userRepository } from "../repositories/user.repository";
import { roleRepository } from "../repositories/role.repository.";
import { RoleCode } from "../utils/enum";
import { ParsedRequest } from "app-request";
import { ISignupSchema, ICredentialSchema } from "../schemas/auth.schema";

export class UserController {
  // SignUp user handler
  public registerUser = asyncHandler(
    async (
      req: ParsedRequest<ISignupSchema>,
      res: Response,
      next: NextFunction
    ) => {
      console.log(req.valid);
      const { email, password, name } = req.valid.body;

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
      res.created({
        message: "user created",
        data: {
          token,
          user: _.omit(user, ["password"]),
        },
      });
    }
  );

  // passport local strategy handler
  public authenticateUser(
    req: ParsedRequest<ICredentialSchema>,
    res: Response,
    next: NextFunction
  ) {
    passport.authenticate(
      "local",
      { session: false },
      function (err, user: User, info) {
        if (err) return next(err);
        if (user) {
          const token = jwt.sign(
            { email: req.valid.body.email },
            env_vars.jwt.secret,
            {
              expiresIn: env_vars.jwt.accessExpiration,
            }
          );
          const userRes = _.pick(user, ["_id", "name", "email", "role"]);
          res.ok({ message: "loggenin", data: { token, user: userRes } });
        }
      }
    )(req, res, next);
  }

  // return authenticated user details
  public me(req: Request, res: Response, next: NextFunction) {
    res.ok({ message: "success", data: req.user });
  }
}
export const userController = new UserController();
