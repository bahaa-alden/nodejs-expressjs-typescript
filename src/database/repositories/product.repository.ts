import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Product, { type IProduct } from '../models/product.model';

export interface ProductFilterOptions {}

export interface ProductFindOptions extends FindOptions<ProductFilterOptions> {
  order: OrderOptions;
}

export class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(Product);
  }

  async findForAdmin(
    options: ProductFindOptions,
  ): Promise<PaginatedList<IProduct>> {
    const { order, pagination, search } = options;

    const query: FilterQuery<IProduct> = { deletedAt: null };
    if (search) {
      query.$or = [];
    }

    const total = await this.model.where(query).countDocuments();
    const results = await this.model
      .find(query)
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      })
      .limit(pagination.pageSize)
      .skip(pagination.page * pagination.pageSize);

    return { results, total };
  }
}

export const productRepository = new ProductRepository();
