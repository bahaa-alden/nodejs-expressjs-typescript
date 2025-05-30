/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUser'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     parameters:
  # filters
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: filter for  role field
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. -name or name)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *
 *   patch:
 *     summary: Update a user
 *     description: Only admins can update other users.
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateUser'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *
 *   delete:
 *     summary: Delete a user.
 *     description: Only admins can delete other users.
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: null
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get your account
 *     description: Logged in users can get only yourselves.
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: unactive your account
 *     description: Logged in users can delete only themselves.
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Update yor account
 *     description: Logged in users can only update their own information
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateMe'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                   $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

const { RoleCode } = require('../../utils/enum');
export const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    address: {
      type: 'object',
      properties: {
        // properties address

        street: {
          type: 'string',
        },

        city: {
          type: 'string',
        },

        country: {
          type: 'string',
        },
      },
    },
    phone: { type: 'string' },
    balance: { type: 'number' },
    email: { type: 'string', format: 'email' },
    name: { type: 'string' },
    role: { type: 'string', enum: Object.values(RoleCode) },
    status: { type: 'string' },
  },
  example: {
    id: '5ebac534954b54139806c112',
    // property example
    address: {
      // property example address
      street: 'ibn zaher',

      city: 'aleppo',

      country: 'syria',
    },
    phone: '+963955555555',
    balance: 2500,
    email: 'user@gmail.com',
    name: 'bahaa alden abdo',
    role: 'USER',
    status: 'true',
  },
};
export const createUser = {
  type: 'object',
  properties: {
    // create property
    address: {
      type: 'object',
      properties: {
        // create properties address

        street: {
          type: 'string',
        },

        city: {
          type: 'string',
        },

        country: {
          type: 'string',
        },
      },
    },
    phone: { type: 'string' },
    balance: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    role: { type: 'string', enum: Object.values(RoleCode) },
  },
  example: {
    // create property example
    address: {
      // create property example address
      street: 'ibn zaher',

      city: 'aleppo',

      country: 'syria',
    },
    phone: '+963955555555',
    balance: 2500,
    name: 'Bahaa abdo',
    email: 'bad@gmail.com',
    password: '123454321',
    role: 'USER',
  },
};

export const updateMe = {
  type: 'object',
  properties: {
    // update property
    address: {
      address: {
        type: 'object',
        properties: {
          // update properties address

          street: {
            type: 'string',
          },

          city: {
            type: 'string',
          },

          country: {
            type: 'string',
          },
        },
      },
      type: 'object',
      properties: {
        // update properties address
      },
    },
    phone: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
  },
  example: {
    // update property example
    address: {
      // update property example address
      street: 'ibn zaher',

      city: 'aleppo',

      country: 'syria',
    },
    phone: '+963955555555',
    name: 'Bahaa alden',
    email: 'bah@gmail.com',
  },
};

export const updateUser = {
  type: 'object',
  properties: {
    // update property
    address: {
      type: 'object',
      properties: {
        // update properties address
        country: 'syria',
      },
    },
    phone: { type: 'string' },
    status: { type: 'string', enum: ['active', 'disactive'] },
    name: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string', enum: Object.values(RoleCode) },
    balance: { type: 'number' },
  },
  example: {
    // update property example
    address: {
      // update property example address
    },
    phone: '+963955555555',
    status: 'active',
    name: 'Bahaa alden',
    email: 'ba@gmail.com',
    role: 'USER',
    balance: 2500,
  },
};
