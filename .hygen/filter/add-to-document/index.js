const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
};
const formatCamals = (input, index) => {
  let arr = input.trim().split(' ');
  let i = index;
  for (i; i < arr.length; i++)
    if (arr[i]) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
  return arr.join('');
};
const eqValueFormat = (values, field) => {
  values[field.charAt(0).toUpperCase() + field.slice(1)] = values[field]
    .trim()
    .split(' ')
    .map((word, index) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join('');
  values[field] =
    values[field.charAt(0).toUpperCase() + field.slice(1)]
      .charAt(0)
      .toLowerCase() +
    values[field.charAt(0).toUpperCase() + field.slice(1)].slice(1);
  let dash = '';
  for (let i = 0; i < values[field].length; i++) {
    if (values[field][i].toUpperCase() == values[field][i])
      dash += `-${values[field][i].toLowerCase()}`;
    else dash += values[field][i];
  }
  values[field + 'Dash'] = dash;
  return values;
};

module.exports = {
  prompt: ({ prompter, args }) =>
    prompter
      .prompt({
        type: 'input',
        name: 'name',
        message: "Entity name (e.g. 'User')",
        validate: (input) => {
          if (!input.trim()) {
            return 'Entity name is required';
          }
          return true;
        },
        format: (input) => {
          return formatCamals(input, 0);
        },
      })
      .then(
        collectPromisesResults((values) => {
          return eqValueFormat(values, 'name');
        }),
      )
      .then(
        collectPromisesResults((rootValues) => {
          return prompter
            .prompt({
              type: 'select',
              name: 'kind',
              message: 'Select kind of type',
              choices: [
                {
                  message: 'Primitive (string, number, etc)',
                  value: 'primitive',
                },
                { message: 'From -> To', value: 'fromTo' },
                { message: 'Enum type', value: 'enum' },
                { message: 'Reference to entity', value: 'reference' },
              ],
            })
            .then(
              collectPromisesResults((values) => {
                if (values.kind === 'enum') {
                  return prompter
                    .prompt({
                      type: 'input',
                      name: 'enumType',
                      message: "Enum name (e.g. 'FileStatus')",
                      validate: (input) => {
                        if (!input.trim()) {
                          return 'Enum name is required';
                        }
                        return true;
                      },
                      format: (input) => {
                        return formatCamals(input, 0);
                      },
                    })
                    .then(
                      collectPromisesResults((values) => {
                        return eqValueFormat(values, 'enumType');
                      }),
                    );
                } else if (values.kind === 'primitive') {
                  return prompter.prompt({
                    type: 'select',
                    name: 'type',
                    message: 'Property type',
                    choices: ['string', 'number', 'boolean', 'date'],
                  });
                }
              }),
            );
        }),
      )
      .then(
        collectPromisesResults((values) => {
          if (values.kind !== 'fromTo') {
            return prompter.prompt({
              type: 'input',
              name: 'property',
              message: "Property name (e.g. 'firstName')",
              validate: (input) => {
                if (!input.trim()) {
                  return 'Property name is required';
                }
                return true;
              },
              format: (input) => {
                return formatCamals(input, 1);
              },
            });
          }
        }),
      )
      .then(
        collectPromisesResults((values) => {
          values.referenceType = undefined;
          return eqValueFormat(values, 'property');
        }),
      ),
};
