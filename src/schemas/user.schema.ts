import { object, TypeOf } from "zod";
import { zodObjectId } from "../middlewares/validator";

const userIdSchema = object({
  id: zodObjectId,
});

export type IUserIdSchema = TypeOf<typeof userIdSchema>;

export default {
  userId: userIdSchema,
};
