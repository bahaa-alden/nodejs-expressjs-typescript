---
to: ./src/swagger/routes/<%=  nameDash %>.swagger.ts
---
/**
 * @swagger
 * tags:
 *   name: <%= h.inflection.pluralize(nameDash) %>
 *   description: <%= Name %> management and retrieval
 */

/**
 * @swagger
 * /<%= h.inflection.pluralize(nameDash) %>:
 *   post:
 *     summary: Create a <%= name %>
 *     description: <%= rolePost %> can create <%= name %>.
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
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
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all <%= h.inflection.pluralize(nameDash) %>
 *     description: <%= roleGet %> can retrieve all <%= h.inflection.pluralize(nameDash) %>.
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
 *     parameters:
  # filters
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
 *         description: Maximum number of <%= h.inflection.pluralize(nameDash) %>
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
 */

/**
 * @swagger
 * /<%= h.inflection.pluralize(nameDash) %>/{id}:
 *   get:
 *     summary: Get a <%= name %>
 *     description: <%= roleGet %> can use this router.
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
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
 *
 *   patch:
 *     summary: Update a <%= name %>
 *     description: <%= roleUpdate %> can use this router.
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
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
 *
 *   delete:
 *     summary: Delete a  <%= name %>.
 *     description: <%= roleDelete %> can use this router.
 *     tags: [<%= h.inflection.pluralize(nameDash) %>]
 *     security:
 *       - Bearer: []
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
 */


export const <%= Name %> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
// property
  },
  example: {
    id: '5ebac534954b54139806c112',
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
 
  },
};

