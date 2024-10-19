import { nativeEnum, object, string, enum as zenum } from "zod";
import { OrderDirection } from "../utils/order";

const numericIdRegex = /^\d+$/u;

export const numericId = string().regex(numericIdRegex).transform(Number);

const positiveIntegerRegex = /^[1-9]\d*$/u;
const objectIdRegex = /^[0-9a-fA-F]{24}$/u;
const referenceIdRegex = /^\d{9}$/u;

export const objectId = string().regex(objectIdRegex);

export const referenceId = string().regex(referenceIdRegex);

export const positiveInteger = string()
  .regex(positiveIntegerRegex)
  .transform(Number);

export const uuid = string().uuid();

export const page = numericId
  .optional()
  .default("1")
  .refine((number) => number >= 0);

export const pageSize = numericId
  .optional()
  .default("100")
  .refine((number) => number > 0);

export const orderColumn = zenum(["id", "createdAt"])
  .optional()
  .default("createdAt");

export const orderDirection = nativeEnum(OrderDirection)
  .optional()
  .default(OrderDirection.desc);

export const localizationSchema = object({
  ar: string(),
  en: string(),
});
