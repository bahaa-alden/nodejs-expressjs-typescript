import { type SchemaDefinition } from 'mongoose';
import { Schema } from 'mongoose';
import { getValuesOf } from './enum';

export type Fn<T> = () => T;

export interface ILocalString {
  en?: string;
  ar?: string;
}

export interface ILocalStringEnum<T> {
  en?: T;
  ar?: T;
}

export const localStringSchema: Schema = new Schema<ILocalString>(
  {
    en: {
      type: String,
    },
    ar: {
      type: String,
    },
  },
  { _id: false },
);

export function createLocalStringSchema<T>(
  enumType: Record<string, string>,
): Schema {
  const schemaDefinition: SchemaDefinition = {
    en: {
      type: String,
      enum: getValuesOf(enumType),
    },
    ar: {
      type: String,
      enum: getValuesOf(enumType),
    },
  };

  return new Schema<T>(schemaDefinition, { _id: false });
}
