import { Router } from 'express';
import validator from '../middlewares/validator';
import productSchema from '../schemas/product.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { productController } from '../controllers/product.controller';
import authSchema from '../schemas/auth.schema';
import { authController } from '../controllers/auth.controller';

export class ProductRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // PROTECTED ROUTES
    this.router.use(
      validator({ headers: authSchema.auth }),
      authController.authenticateJWT,
    );

    // ONLY FOR USERS
    this.router.use(restrict(RoleCode.USER));
    this.router.use(authorizationMiddleware.authorization);

    // GET ALL PRODUCTS
    this.router.get(
      '/',
      validator({ query: productSchema.productAll }),
      productController.getProducts,
    );

    // GET PRODUCT BY ID
    this.router.get(
      '/:id',
      validator({ params: productSchema.productId }),
      productController.getProduct,
    );

    // CREATE PRODUCT
    this.router.post(
      '/',
      validator({ body: productSchema.productCreate }),
      productController.createProduct,
    );

    // UPDATE PRODUCT BY ID
    this.router.patch(
      '/:id',
      validator({
        params: productSchema.productId,
        body: productSchema.productUpdate,
      }),
      productController.updateProduct,
    );

    // DELETE PRODUCT BY ID
    this.router.delete(
      '/:id',
      validator({ params: productSchema.productId }),
      productController.deleteProduct,
    );
  }
}

export const productRoutes = new ProductRoutes();
