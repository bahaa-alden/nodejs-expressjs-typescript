import { NextFunction, ParsedRequest, Request, Response } from 'express';
import * as passport from 'passport';
import '../auth/passportHandler';
import { env_vars } from '../config';
import { randomBytes } from 'crypto';
import {
  ICredentialSchema,
  IForgotPasswordSchema,
  IResetPasswordSchema,
  ISignupSchema,
  IUpdateMyPasswordSchema,
} from '../schemas/auth.schema';
import * as jwt from 'jsonwebtoken';
import { userRepository } from '../database/repositories/user.repository';
import {
  AuthFailureError,
  ConflictError,
  InternalError,
  NotFoundError,
  TokenExpiredError,
} from '../core/ApiError';
import { existRecord, needRecord } from '../utils/record';
import asyncHandler from '../middlewares/asyncHandler';
import { IUser } from '../database/models/user.model';
import Email from '../config/email-node';
// import { InternalErrorResponse } from '../core/ApiResponse';

export class AuthController {
  // SignUp user handler
  public registerUser = asyncHandler(
    async (
      req: ParsedRequest<ISignupSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const { email, password, name } = req.valid.body;
      existRecord(
        await userRepository.exists(email),
        new ConflictError('User already exist'),
      );
      const user = await userRepository.insert({
        name,
        email,
        password,
      });
      const token = jwt.sign({ email: req.body.email }, env_vars.jwt.secret, {
        expiresIn: env_vars.jwt.accessExpiration,
      });
      res.created({
        message: 'user created',
        data: {
          token,
          user,
        },
      });
    },
  );
  // passport local strategy handler
  public authenticateUser(
    req: ParsedRequest<ICredentialSchema>,
    res: Response,
    next: NextFunction,
  ) {
    passport.authenticate(
      'local',
      { session: false },
      function (err, user: IUser, info) {
        if (err) return next(err);
        if (user) {
          const token = jwt.sign(
            { email: req.valid.body.email },
            env_vars.jwt.secret,
            {
              expiresIn: env_vars.jwt.accessExpiration,
            },
          );
          res.ok({ message: 'loggenin', data: { token, user } });
        }
      },
    )(req, res, next);
  }
  // return authenticated user details
  public me(req: Request, res: Response, next: NextFunction) {
    res.ok({ message: 'success', data: req.user });
  }

  public forgotPassword = asyncHandler(
    async (
      req: ParsedRequest<IForgotPasswordSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      // 1) Get user based on POSTed email
      const user = needRecord(
        await userRepository.findByEmail(req.valid.body.email),
        new NotFoundError('user not found'),
      );
      // 2) Generate the random reset token
      const resetToken = randomBytes(3).toString('hex');
      user.passwordResetToken = resetToken;
      user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save({ validateBeforeSave: false });
      // 3) Send it to user's email
      try {
        await new Email(user, '').sendPasswordReset(resetToken);
        res.ok({
          message: 'Token sent to email!',
          data: {
            message: 'Token sent to email!',
          },
        });
      } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        console.log(err);
        return next(new InternalError());
      }
    },
  );

  public resetPassword = asyncHandler(
    async (
      req: ParsedRequest<IResetPasswordSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      // 1) Get user based on POSTed email
      const user = needRecord(
        await userRepository.findOneBy({
          passwordResetToken: req.valid.body.token,
        }),
        new NotFoundError('user not found'),
      );

      if (user.passwordResetExpires && user.passwordResetExpires < new Date())
        throw new TokenExpiredError();

      user.password = req.valid.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      const token = jwt.sign({ email: user.email }, env_vars.jwt.secret, {
        expiresIn: env_vars.jwt.accessExpiration,
      });
      res.ok({ message: 'reset password is succeed', data: { token, user } });
    },
  );

  public updateMyPassword = asyncHandler(
    async (
      req: ParsedRequest<IUpdateMyPasswordSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = needRecord(
        await userRepository.findByEmail(req.user.email),
        new NotFoundError('user not found'),
      );
      const isMatch = await new Promise<boolean>((resolve, reject) => {
        user.comparePassword(
          req.valid.body.passwordCurrent,
          (err: Error, isMatch: boolean) => {
            if (err) return reject(err);
            resolve(isMatch);
          },
        );
      });

      if (!isMatch) {
        return next(new AuthFailureError('Invalid password.'));
      }
      user.password = req.valid.body.password;
      await user.save();

      const token = jwt.sign({ email: user.email }, env_vars.jwt.secret, {
        expiresIn: env_vars.jwt.accessExpiration,
      });

      res.ok({ message: 'update password is succesed', data: { token, user } });
    },
  );
}
export const authController = new AuthController();
