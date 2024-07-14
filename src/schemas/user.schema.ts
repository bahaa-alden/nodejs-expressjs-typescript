import { object } from "zod";
import { zodObjectId } from "../helpers/validator";

const userIdSchema = object({
  id: zodObjectId,
});

export default {
  userId: userIdSchema,
};
