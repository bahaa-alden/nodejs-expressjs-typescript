import { omit } from 'lodash';

export function transformObject(obj: any, lang: string, fields: string[]) {
  if (!obj || typeof obj !== 'object') return obj;

  // If obj is a Mongoose document, extract `_doc`
  const source = obj._doc ? obj._doc : obj;

  let transformed = { ...source };

  // Replace _id with id
  if (transformed._id) {
    transformed.id = transformed._id.toString();
    transformed = omit(transformed, ['deletedAt', '__v', '_id']);
  }

  fields.forEach((field) => {
    if (transformed[field] && typeof transformed[field] === 'object') {
      if (!transformed[field].ar && !transformed[field].en) {
        transformed[field] = transformObject(transformed[field], lang, fields);
      } else {
        // Assign the requested language value
        transformed[field] =
          transformed[field][lang] || transformed[field]['en'] || null;
      }
    }
  });

  return transformed;
}
