---
to: src/database/repositories/<%= nameDash %>.repository.ts
---
import { type FilterQuery } from 'mongoose'
import { type PaginatedList } from '../../utils/pagination'
import { OrderDirection, type OrderOptions } from '../../utils/order'
import { BaseRepository, type FindOptions } from './base.repository'
import <%= Name %>, { type I<%= Name %> } from '../models/<%= nameDash %>.model'

export interface <%= Name %>FilterOptions {}

export interface <%= Name %>FindOptions extends FindOptions<<%= Name %>FilterOptions> {
  order: OrderOptions
}

export class <%= Name %>Repository extends BaseRepository<I<%= Name %>> {
  constructor() {
    super(<%= Name %>)
  }

  async findForAdmin(options: <%= Name %>FindOptions): Promise<PaginatedList<I<%= Name %>>> {
    const { order, pagination, search } = options

    const query: FilterQuery<I<%= Name %>> = { deletedAt: null }
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

export const <%= name %>Repository = new <%= Name %>Repository()
