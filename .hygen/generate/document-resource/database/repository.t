---
to: src/database/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
---
import { type FilterQuery } from 'mongoose'
import { type PaginatedList } from '../../utils/pagination'
import { OrderDirection, type OrderOptions } from '../../utils/order'
import { BaseRepository, type FindOptions } from './base.repository'
import <%= h.inflection.capitalize(name) %>, { type I<%= h.inflection.capitalize(name) %> } from '../models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model'

export interface <%= h.inflection.capitalize(name) %>FilterOptions {}

export interface <%= h.inflection.capitalize(name) %>FindOptions extends FindOptions<<%= h.inflection.capitalize(name) %>FilterOptions> {
  order: OrderOptions
}

export class <%= h.inflection.capitalize(name) %>Repository extends BaseRepository<I<%= h.inflection.capitalize(name) %>> {
  constructor() {
    super(<%= h.inflection.capitalize(name) %>)
  }

  async findForAdmin(options: <%= h.inflection.capitalize(name) %>FindOptions): Promise<PaginatedList<I<%= h.inflection.capitalize(name) %>>> {
    const { order, pagination, search } = options

    const query: FilterQuery<I<%= h.inflection.capitalize(name) %>> = { deletedAt: null }
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

export const <%= h.inflection.camelize(name, true) %>Repository = new <%= h.inflection.capitalize(name) %>Repository()
