---
to: ./src/swagger/routes/<%=  nameDash %>.swagger.ts
---
/**
 * @swagger
 * tags:
<<<<<<< HEAD
 *   name: <%= h.inflection.pluralize(Name) %>
=======
 *   name: <%= h.inflection.pluralize(nameDash) %>
>>>>>>> origin/main
 *   description: <%= Name %> management and retrieval
 */

/**
 * @swagger
<<<<<<< HEAD
 * /<%= h.inflection.pluralize(name) %>:
 *   post:
 *     summary: Create a <%= name %>
 *     description: <%= rolePost %> can create <%= name %>.
 *     tags: [<%= h.inflection.pluralize(Name) %>]
 *     security:
 *       - bearerAuth: []
=======
 * /<%= h.inflection.pluralize(nameDash) %>:
 *   post:
 *     summary: Create a <%= name %>
 *     description: <%= rolePost %> can create <%= name %>.
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
>>>>>>> origin/main
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/create<%= Name %>'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/<%= Name %>'
 *       "400":
<<<<<<< HEAD
 *         $ref: '#/components/responses/DuplicateEmail'
=======
 *         $ref: '#/components/responses/BadRequest'
>>>>>>> origin/main
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
<<<<<<< HEAD
 *
 *   get:
 *     summary: Get all <%= h.inflection.pluralize(name) %>
 *     description: <%= roleGet %> can retrieve all <%= h.inflection.pluralize(name) %>.
 *     tags: [<%= h.inflection.pluralize(Name) %>]
 *     security:
 *       - Bearer: []
 *     parameters:
=======
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *
 *   get:
 *     summary: Get all <%= h.inflection.pluralize(nameDash) %>
 *     description: <%= roleGet %> can retrieve all <%= h.inflection.pluralize(nameDash) %>.
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
 *     parameters:
  # filters
>>>>>>> origin/main
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: what fields do you want to show (ex. name,price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
<<<<<<< HEAD
 *         description: Maximum number of <%= h.inflection.pluralize(name) %>
=======
 *         description: Maximum number of <%= h.inflection.pluralize(nameDash) %>
>>>>>>> origin/main
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: key-words you want to search about it
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name,-price)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/<%= Name %>'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
<<<<<<< HEAD
=======
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 */

/**
 * @swagger
<<<<<<< HEAD
 * /<%= h.inflection.pluralize(name) %>/{id}:
 *   get:
 *     summary: Get a <%= name %>
 *     description: <%= roleGet %> can use this router.
 *     tags: [<%= h.inflection.pluralize(Name) %>]
 *     security:
 *       - bearerAuth: []
=======
 * /<%= h.inflection.pluralize(nameDash) %>/{id}:
 *   get:
 *     summary: Get a <%= name %>
 *     description: <%= roleGet %> can use this router.
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
>>>>>>> origin/main
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: <%= Name %> id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/<%= Name %>'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
<<<<<<< HEAD
=======
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 *
 *   patch:
 *     summary: Update a <%= name %>
 *     description: <%= roleUpdate %> can use this router.
<<<<<<< HEAD
 *     tags: [<%= h.inflection.pluralize(Name) %>]
 *     security:
 *       - bearerAuth: []
=======
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
>>>>>>> origin/main
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: <%= Name %> id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/update<%= Name %>'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/<%= Name %>'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
<<<<<<< HEAD
=======
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 *
 *   delete:
 *     summary: Delete a  <%= name %>.
 *     description: <%= roleDelete %> can use this router.
<<<<<<< HEAD
 *     tags: [<%= h.inflection.pluralize(Name) %>]
 *     security:
 *       - bearerAuth: []
=======
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
>>>>>>> origin/main
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: <%= Name %> id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
<<<<<<< HEAD
=======
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 */


export const <%= Name %> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
// property
  },
  example: {
<<<<<<< HEAD
    _id: '5ebac534954b54139806c112',
=======
    id: '5ebac534954b54139806c112',
>>>>>>> origin/main
// property example
   createdAt: "2024-11-24T16:35:04.438Z",
   updatedAt: "2024-11-24T16:35:04.438Z"
  },
};
export const create<%= Name %> = {
  type: 'object',
  properties: {
// create property
  },
  example: {
// create property example
<<<<<<< HEAD
  createdAt: "2024-11-24T16:35:04.438Z",
  updatedAt: "2024-11-24T16:35:04.438Z"
=======
>>>>>>> origin/main
  },
  required:[
// required property
  ]
};
export const update<%= Name %> = {
  type: 'object',
  properties: {
// update property
  },
  example: {
// update property example
<<<<<<< HEAD
 createdAt: "2024-11-24T16:35:04.438Z",
 updatedAt: "2024-11-24T16:35:04.438Z"
=======
 
>>>>>>> origin/main
  },
};

