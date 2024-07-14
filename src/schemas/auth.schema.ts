import { object, string } from "zod";
import { zodAuthBearer } from "../helpers/validator";

const credentialSchema = object({
  email: string().email(),
  password: string().min(6),
});

const authSchema = object({
  authorization: zodAuthBearer,
}).passthrough();

const signupSchema = object({
  name: string().min(3),
  email: string().email(),
  password: string().min(6),
});

export default {
  credential: credentialSchema,
  auth: authSchema,
  signup: signupSchema,
};
