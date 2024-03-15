import { NextFunction, Request, Response } from "express";
import * as passport from "passport";
import "../auth/passportHandler";

export class AuthController {
  // jwt passport middleware to check  authenticated user

  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false, failWithError: true })(
      req,
      res,
      next
    );
  }
}
