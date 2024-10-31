import { Router } from 'express';
import validator from '../middlewares/validator';
import carSchema from '../schemas/car.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { carController } from '../controllers/car.controller';
import authSchema from '../schemas/auth.schema';
import { authController } from '../controllers/auth.controller';

export class CarRoutes {
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

    // ONLY FOR ADMINS
    this.router.use(restrict(RoleCode.ADMIN));
    this.router.use(authorizationMiddleware.authorization);

    // GET ALL CARS
    this.router.get(
      '/',
      validator({ query: carSchema.carAll }),
      carController.getCars,
    );

    // GET CAR BY ID
    this.router.get(
      '/:id',
      validator({ params: carSchema.carId }),
      carController.getCar,
    );

    // CREATE CAR
    this.router.post(
      '/',
      validator({ body: carSchema.carCreate }),
      carController.createCar,
    );

    // UPDATE CAR BY ID
    this.router.patch(
      '/:id',
      validator({ params: carSchema.carId, body: carSchema.carUpdate }),
      carController.updateCar,
    );

    // DELETE CAR BY ID
    this.router.delete(
      '/:id',
      validator({ params: carSchema.carId }),
      carController.deleteCar,
    );
  }
}

export const carRoutes = new CarRoutes();
