export const selectedFields = (fields: string = '') => {
  const fieldsObject = {};
  fields.split(',').forEach((field) => {
    fieldsObject[field] = 1;
  });
  fieldsObject['createdAt'] = 1;
  fieldsObject['updatedAt'] = 1;
  return fieldsObject;
};
