import * as Joi from "joi";
import { JoiObjectId } from "../helpers/validator";

export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
};
