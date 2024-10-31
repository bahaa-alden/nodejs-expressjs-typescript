---
to: src/database/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
---
import { type FilterQuery } from 'mongoose'
import { type PaginatedList } from '../../utils/pagination'
import { OrderDirection, type OrderOptions } from '../../utils/order'
import { BaseRepository, type FindOptions } from './base.repository'
import <%= name %>, { type I<%= name %> } from '../models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model'

export interface <%= name %>FilterOptions {}

export interface <%= name %>FindOptions extends FindOptions<<%= name %>FilterOptions> {
  order: OrderOptions
}

export class <%= name %>Repository extends BaseRepository<I<%= name %>> {
  constructor() {
    super(<%= name %>)
  }

  async findForAdmin(options: <%= name %>FindOptions): Promise<PaginatedList<I<%= name %>>> {
    const { order, pagination, search } = options

    const query: FilterQuery<I<%= name %>> = { deletedAt: null }
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

export const <%= h.inflection.camelize(name, true) %>Repository = new <%= name %>Repository()
