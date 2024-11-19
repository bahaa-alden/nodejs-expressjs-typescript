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

const signupSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

export type ISignupSchema = TypeOf<typeof signupSchema>;

export default {
  credential: credentialSchema,
  auth: authSchema,
  signup: signupSchema,
};
