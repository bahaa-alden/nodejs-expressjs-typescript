import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  ProductFindOptions,
  productRepository,
} from '../database/repositories/product.repository';
import {
  IProductAllSchema,
  IProductIdSchema,
  IProductCreateSchema,
  IProductUpdateSchema,
} from '../schemas/product.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class ProductController {
  // Get all products by author
  public getProducts = asyncHandler(
    async (
      req: ParsedRequest<void, IProductAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: ProductFindOptions = {
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
      const products = await productRepository.findForAdmin(options);

      res.ok({ message: 'success', data: products });
    },
  );

  // Get product by Id for authenticated user
  public getProduct = asyncHandler(
    async (
      req: ParsedRequest<void, void, IProductIdSchema>,
      res: Response,
    ): Promise<void> => {
      const product = needRecord(
        await productRepository.findById(req.valid.params.id),
        new NotFoundError('Product not found'),
      );

      res.ok({ message: 'success', data: product });
    },
  );

  // Create product handler
  public createProduct = asyncHandler(
    async (
      req: ParsedRequest<IProductCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newProduct = req.valid.body;
      const product = await productRepository.insert(newProduct);
      if (product === null) {
        throw new InternalError();
      }
      res.created({ message: 'Product has been created', data: product });
    },
  );

  // Update product by Id for authenticated user
  public updateProduct = asyncHandler(
    async (
      req: ParsedRequest<IProductUpdateSchema, void, IProductIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const product = needRecord(
        await productRepository.findById(req.valid.params.id),
        new NotFoundError('Product not found'),
      );

      const data = await productRepository.patchById(product.id, updateBody);

      res.ok({ message: 'Product has been updated', data });
    },
  );

  // Delete product by Id for authenticated user
  public deleteProduct = asyncHandler(
    async (
      req: ParsedRequest<void, void, IProductIdSchema>,
      res: Response,
    ): Promise<void> => {
      const product = needRecord(
        await productRepository.findById(req.valid.params.id),
        new NotFoundError('Product not found'),
      );

      await productRepository.deleteById(product.id);
      res.noContent({ message: 'Product deleted successfully' });
    },
  );
}

export const productController = new ProductController();
