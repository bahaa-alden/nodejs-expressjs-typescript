import { TypeOf, z } from 'zod';
import { zodAuthBearer } from '../middlewares/validator';

const credentialSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

export type ICredentialSchema = TypeOf<typeof credentialSchema>;

const authSchema = z.object({
  authorization: zodAuthBearer,
});

export type IAuthSchema = TypeOf<typeof authSchema>;

const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type ISignupSchema = TypeOf<typeof signupSchema>;

const forgotPasswordSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();

export type IForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>;

const resetPasswordSchema = z
  .object({
    password: z.string(),
    token: z.string().max(6).min(6),
  })
  .strict();

export type IResetPasswordSchema = TypeOf<typeof resetPasswordSchema>;

const updateMyPasswordSchema = z
  .object({
    passwordCurrent: z.string(),
    password: z.string(),
  })
  .strict();

export type IUpdateMyPasswordSchema = TypeOf<typeof updateMyPasswordSchema>;

export default {
  credential: credentialSchema,
  auth: authSchema,
  signup: signupSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
  updateMyPassword: updateMyPasswordSchema,
};
