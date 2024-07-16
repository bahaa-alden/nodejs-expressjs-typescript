import { object, string, TypeOf } from "zod";
import { zodAuthBearer } from "../middlewares/validator";

const credentialSchema = object({
  email: string().email(),
  password: string().min(6),
}).strict();

export type ICredentialSchema = TypeOf<typeof credentialSchema>;

const authSchema = object({
  authorization: zodAuthBearer,
});

export type IAuthSchema = TypeOf<typeof authSchema>;

const signupSchema = object({
  name: string().min(3),
  email: string().email(),
  password: string().min(6),
}).strict();

export type ISignupSchema = TypeOf<typeof signupSchema>;

export default {
  credential: credentialSchema,
  auth: authSchema,
  signup: signupSchema,
};
