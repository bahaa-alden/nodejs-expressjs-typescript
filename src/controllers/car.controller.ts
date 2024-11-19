import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  CarFindOptions,
  carRepository,
} from '../database/repositories/car.repository';
import {
  ICarAllSchema,
  ICarIdSchema,
  ICarCreateSchema,
  ICarUpdateSchema,
} from '../schemas/car.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class CarController {
  // Get all cars by author
  public getCars = asyncHandler(
    async (
      req: ParsedRequest<void, ICarAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: CarFindOptions = {
        filter: {
          search: req.valid.query.search,
        },
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
      };
      const cars = await carRepository.findForAdmin(options);

      res.ok({ message: 'success', data: cars });
    },
  );

  // Get car by Id for authenticated user
  public getCar = asyncHandler(
    async (
      req: ParsedRequest<void, void, ICarIdSchema>,
      res: Response,
    ): Promise<void> => {
      const car = needRecord(
        await carRepository.findById(req.valid.params.id),
        new NotFoundError('Car not found'),
      );

      res.ok({ message: 'success', data: car });
    },
  );

  // Create car handler
  public createCar = asyncHandler(
    async (
      req: ParsedRequest<ICarCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newCar = req.valid.body;
      const car = await carRepository.insert(newCar);
      if (car === null) {
        throw new InternalError();
      }
      res.created({ message: 'Car has been created', data: car });
    },
  );

  // Update car by Id for authenticated user
  public updateCar = asyncHandler(
    async (
      req: ParsedRequest<ICarUpdateSchema, void, ICarIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const car = needRecord(
        await carRepository.findById(req.valid.params.id),
        new NotFoundError('Car not found'),
      );

      const data = await carRepository.patchById(car.id, updateBody);

      res.ok({ message: 'Car has been updated', data });
    },
  );

  // Delete car by Id for authenticated user
  public deleteCar = asyncHandler(
    async (
      req: ParsedRequest<void, void, ICarIdSchema>,
      res: Response,
    ): Promise<void> => {
      const car = needRecord(
        await carRepository.findById(req.valid.params.id),
        new NotFoundError('Car not found'),
      );

      await carRepository.deleteById(car.id);
      res.noContent({ message: 'Car deleted successfully' });
    },
  );
}

export const carController = new CarController();
