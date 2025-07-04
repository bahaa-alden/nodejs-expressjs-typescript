/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: API to authentication users
 */

/**
 * @swagger
 *   /users/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signUp'
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
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQ4ZDJjZjBkMmM5NWNiOTM5OTgyZSIsImlhdCI6MTcxMzIxMjcxNywiZXhwIjoxNzIwOTg4NzE3fQ.FbARIC4jDWtOb0koNJK69F2MTu8j9LeS3RaFrT-AP7c
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
<<<<<<< HEAD
=======
 *       "500":
 *         $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 */

//                                                      login

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: user@gmail.com
 *               password: "123454321"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    exaple:
 *                      status: success
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQ4ZDJjZjBkMmM5NWNiOTM5OTgyZSIsImlhdCI6MTcxMzIxMjcxNywiZXhwIjoxNzIwOTg4NzE3fQ.FbARIC4jDWtOb0koNJK69F2MTu8j9LeS3RaFrT-AP7c
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: error
 *               message: Invalid email or password
<<<<<<< HEAD
=======
 *       "500":
 *         $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 */

//NOTE                                                        forgotPassword
/**
 * @swagger
 *   /users/forgotPassword:
 *     post:
 *       summary: forgot password
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *               properties:
 *                 email:
 *                   type: string
 *       responses:
 *         "400":
<<<<<<< HEAD
 *           $ref: '#/components/responses/400'
=======
 *           $ref: '#/components/responses/BadRequest'
>>>>>>> origin/main
 *         "200":
 *           description: reset password token has been sent
 *           contents:
 *             application/json
<<<<<<< HEAD
=======
 *         "500":
 *           $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 */

//NOTE                                              resetpassword
/**
 * @swagger
 *   /users/resetPassword:
 *     patch:
<<<<<<< HEAD
 *       summary: forgot password
 *       tags: [Auth]
 *       parameters:
=======
 *       summary: reset password
 *       tags: [Auth]
>>>>>>> origin/main
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
<<<<<<< HEAD
 *                 email:
 *                   type: string
 *                 resetToken:
=======
 *                 token:
>>>>>>> origin/main
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *          "200":
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: success
 *                    token:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQ4ZDJjZjBkMmM5NWNiOTM5OTgyZSIsImlhdCI6MTcxMzIxMjcxNywiZXhwIjoxNzIwOTg4NzE3fQ.FbARIC4jDWtOb0koNJK69F2MTu8j9LeS3RaFrT-AP7c
 *          "401":
 *            description: Password reset failed
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Error'
 *                example:
 *                  status: error
 *                  message: Password reset failed
<<<<<<< HEAD
=======
 *          "400":
 *            $ref: '#/components/responses/BadRequest'
 *          "500":
 *            $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 */

//NOTE                                       updateMyPassword

/**
 * @swagger
 *   /users/updateMyPassword:
 *     patch:
 *       summary: Update Current User
 *       tags: [Auth]
 *       security:
 *         - Bearer: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  passwordCurrent:
 *                   type: string
 *                  password:
 *                   type: string
 *       responses:
 *         "400":
<<<<<<< HEAD
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
=======
 *           $ref: '#/components/responses/BadRequest'
 *         "401":
 *           $ref: '#/components/responses/Unauthorized'
 *         "500":
 *           $ref: '#/components/responses/InternalError'
>>>>>>> origin/main
 *         "200":
 *           description: Created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: success
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *                   token:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQ4ZDJjZjBkMmM5NWNiOTM5OTgyZSIsImlhdCI6MTcxMzIxMjcxNywiZXhwIjoxNzIwOTg4NzE3fQ.FbARIC4jDWtOb0koNJK69F2MTu8j9LeS3RaFrT-AP7c
 */

export const signUp = {
  type: 'object',
  required: [
    // required property
<<<<<<< HEAD
=======

>>>>>>> origin/main
    'name',
    'email',
    'password',
  ],
  properties: {
<<<<<<< HEAD
    //  property signup
=======
    //  property _signup
    phone: { type: 'string' },
>>>>>>> origin/main
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  example: {
<<<<<<< HEAD
    // create property example
=======
    // create property _example
    phone: '+963955555555',
>>>>>>> origin/main
    name: 'Adel Seirafi',
    email: 'user@gmail.com',
    password: '123454321',
  },
};
