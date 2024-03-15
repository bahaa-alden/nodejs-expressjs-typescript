import * as Joi from "joi";
import { JoiObjectId } from "../helpers/validator";

export default {
  taskId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  taskAll: Joi.object().keys({
    page: Joi.number().optional().min(1),
    limit: Joi.number().optional().min(1),
  }),
  taskCreate: Joi.object().keys({
    title: Joi.string().required().min(3).max(500),
    description: Joi.string().required().min(3).max(2000),
  }),
  taskUpdate: Joi.object().keys({
    title: Joi.string().optional().min(3).max(500),
    description: Joi.string().optional().min(3).max(2000),
    completed: Joi.boolean().optional(),
  }),
};
