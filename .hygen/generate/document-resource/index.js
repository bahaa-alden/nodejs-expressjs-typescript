const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
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
          return input.trim();
        },
      })
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'select',
            name: 'role',
            message: "role name (e.g. 'ADMIN/USER')",
            choices: [
              {
                message: 'admin',
                value: 'ADMIN',
              },
              {
                message: 'user',
                value: 'USER',
              },
            ],
          });
        }),
      ),
};
