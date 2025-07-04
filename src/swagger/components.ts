export const Error = {
  type: 'object',
  properties: { status: { type: 'string' }, message: { type: 'string' } },
};
export const DuplicateEmail = {
  description: 'Email already taken',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: { status: 'error', message: 'Email already taken' },
    },
  },
};
<<<<<<< HEAD
=======

>>>>>>> origin/main
export const Unauthorized = {
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: {
        status: 'error',
        message: 'You are not logged in! Please log in to get access.',
      },
    },
  },
};
<<<<<<< HEAD
=======

>>>>>>> origin/main
export const Forbidden = {
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: {
        status: 'error',
        message: 'You do not have permission to perform this action',
      },
    },
  },
};

export const NotFound = {
  description: 'Not found',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: {
        status: 'error',
        message: "Can't find  /cars/id   on this server!",
      },
    },
  },
};
<<<<<<< HEAD
=======

export const BadRequest = {
  description: 'BadRequest',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: {
        status: 'error',
        message: 'Please send acceptable data',
      },
    },
  },
};

export const InternalError = {
  description: 'Internal error',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
      example: {
        status: 'error',
        message: 'something went very wrong',
      },
    },
  },
};
>>>>>>> origin/main
