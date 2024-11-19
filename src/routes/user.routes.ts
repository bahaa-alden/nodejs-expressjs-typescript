import { Router } from 'express';
import validator from '../middlewares/validator';
import authSchema from '../schemas/auth.schema';
import { userController } from '../controllers/user.controller';
import userSchema from '../schemas/user.schema';
import { RoleCode } from '../utils/enum';
import restrict from '../middlewares/restrict';
import { authorizationMiddleware } from '../auth/authorization';
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
      userController.registerUser,
    );

    // LOGIN
    this.router.post(
      '/login',
      validator({ body: authSchema.credential }),
      userController.authenticateUser,
    );

    // protect routes
    this.router.use(
      validator({ headers: authSchema.auth }),
      authController.authenticateJWT,
    );

    // ME
    this.router.get('/me', userController.me);

    // UPDATE ME
    this.router.patch(
      '/me',
      validator({ body: userSchema.updateUser }),
      userController.updateMe,
    );

    // DELETE ME
    this.router.delete('/me', userController.deleteMe);

    // only for admins
    this.router.use(restrict(RoleCode.ADMIN));
    this.router.use(authorizationMiddleware.authorization);

    // Get All Users
    this.router.get(
      '/',
      validator({ query: userSchema.userAll }),
      userController.get,
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
