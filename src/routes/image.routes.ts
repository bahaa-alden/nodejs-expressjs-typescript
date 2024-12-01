import { Router } from 'express';
import validator from '../middlewares/validator';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../middlewares/authorization';
import { imageController } from '../controllers/image.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import { upload } from '../middlewares/uploadingImage';

const { USER, ADMIN } = RoleCode;

export class ImageRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // PROTECTED ROUTES
    this.router.use(
      validator({ headers: authSchema.auth }),
      authMiddleware.authenticateJWT,
    );

    // CREATE IMAGE
    this.router.post(
      '/',
      restrict(ADMIN, USER),
      authorizationMiddleware.authorization,
      upload.array('images', 10),
      imageController.createImage,
    );
  }
}

export const imageRoutes = new ImageRoutes();
