import { type FilterQuery } from 'mongoose'
import { type PaginatedList } from '../../utils/pagination'
import { OrderDirection, type OrderOptions } from '../../utils/order'
import { BaseRepository, type FindOptions } from './base.repository'
import Car, { type ICar } from '../models/car.model'

export interface CarFilterOptions {}

export interface CarFindOptions extends FindOptions<CarFilterOptions> {
  order: OrderOptions
}

export class CarRepository extends BaseRepository<ICar> {
  constructor() {
    super(Car)
  }

  async findForAdmin(options: CarFindOptions): Promise<PaginatedList<ICar>> {
    const { order, pagination, search } = options

    const query: FilterQuery<ICar> = { deletedAt: null }
    if (search) {
      query.$or = []
    }

    const total = await this.model.where(query).countDocuments()
    const results = await this.model.find(query).sort({
      [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
    })
      .limit(pagination.pageSize)
      .skip(pagination.page * pagination.pageSize)

    return { results, total }
  }
}

export const carRepository = new CarRepository()
