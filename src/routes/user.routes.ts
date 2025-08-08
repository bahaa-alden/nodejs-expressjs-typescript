import { Router } from 'express';
import validator from '../middlewares/validator';
import authSchema from '../schemas/auth.schema';
import { userController } from '../controllers/user.controller';
import userSchema from '../schemas/user.schema';
import { RoleCode } from '../utils/enum';
import restrict from '../middlewares/restrict';
import { authorizationMiddleware } from '../middlewares/authorization';
import { authMiddleware } from '../middlewares/authJwt';
import { authController } from '../controllers/auth.controller';

export class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    // REGISTER
    this.router.post(
      '/register',
      validator({ body: authSchema.signup }),
      authController.registerUser,
    );

    // LOGIN
    this.router.post(
      '/login',
      validator({ body: authSchema.credential }),
      authController.authenticateUser,
    );

    this.router.post(
      '/forgotPassword',
      validator({ body: authSchema.forgotPassword }),
      authController.forgotPassword,
    );

    this.router.patch(
      '/resetPassword',
      validator({ body: authSchema.resetPassword }),
      authController.resetPassword,
    );

    // protect routes
    this.router.use(
      validator({ headers: authSchema.auth }),
      authMiddleware.authenticateJWT,
    );

    this.router.patch(
      '/updateMyPassword',
      validator({ body: authSchema.updateMyPassword }),
      authController.updateMyPassword,
    );

    // ME
    this.router.get('/me', userController.me);

    // UPDATE ME
    this.router.patch(
      '/me',
      validator({ body: userSchema.updateMeSchema }),
      userController.updateMe,
    );

    // DELETE ME
    this.router.delete('/me', userController.deleteMe);

    // Get All Users
    this.router.get(
      '/',
      validator({ query: userSchema.userAll }),
      userController.get,
    );

    // only for admins
    this.router.use(restrict(RoleCode.ADMIN));
    this.router.use(authorizationMiddleware.authorization);

    this.router.post(
      '/',
      validator({ body: userSchema.createUser }),
      userController.registerUser,
    );

    // Get User BY ID
    this.router.get(
      '/:id',
      validator({ params: userSchema.userId, body: userSchema.updateUser }),
      userController.getOne,
    );

    // UPDATE User BY ID
    this.router.patch(
      '/:id',
      validator({ params: userSchema.userId, body: userSchema.updateUser }),
      userController.updateOne,
    );

    // DELETE USER BY ID
    this.router.delete(
      '/:id',
      validator({ params: userSchema.userId }),
      userController.deleteOne,
    );
  }
}
export const userRoutes = new UserRoutes();
