import { type FilterQuery } from 'mongoose'
import { type PaginatedList } from '../../utils/pagination'
import { OrderDirection, type OrderOptions } from '../../utils/order'
import { BaseRepository, type FindOptions } from './base.repository'
import Task, { type ITask } from '../models/task.model'

export interface TaskFilterOptions {}

export interface TaskFindOptions extends FindOptions<TaskFilterOptions> {
  order: OrderOptions
}

export class TaskRepository extends BaseRepository<ITask> {
  constructor() {
    super(Task)
  }

  async findForAdmin(options: TaskFindOptions): Promise<PaginatedList<ITask>> {
    const { order, pagination, search } = options

    const query: FilterQuery<ITask> = { deletedAt: null }
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

export const taskRepository = new TaskRepository()
