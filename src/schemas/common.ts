import { string } from "zod";

const numericIdRegex = /^\d+$/u;

export const numericId = string().regex(numericIdRegex).transform(Number);
