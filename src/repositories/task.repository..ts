import { FilterQuery } from "mongoose";
import ITask, { Task } from "../models/task.model";
import { OrderDirection, OrderOptions } from "../utils/order";
import { BaseRepository, FindOptions } from "./base.repository";

export interface TaskOrderOptions extends OrderOptions {
  column: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskFilterOptions {
  authorId?: string;
}

export interface FindTaskOptions extends FindOptions<TaskFilterOptions> {
  order: TaskOrderOptions;
}

export class TaskRepository extends BaseRepository<ITask> {
  constructor() {
    super(Task);
  }

  async findByIdForAuthor(id: string, authorId: string): Promise<ITask | null> {
    return this.model
      .findOne({ _id: id, authorId })
      .where({ deletedAt: null })
      .populate("author");
  }

  async findForAuthor(options: FindTaskOptions): Promise<ITask[]> {
    const { pagination, order, filter } = options;
    const query: FilterQuery<ITask> = { deletedAt: null };

    if (filter?.authorId) {
      query.authorId = filter.authorId;
    }

    return await this.model
      .find(query)
      .skip(pagination.pageSize * (pagination.page - 1))
      .limit(pagination.pageSize)
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      });
  }

  async findForUser(options: FindTaskOptions): Promise<ITask[]> {
    const { pagination, order, filter } = options;
    const query: FilterQuery<ITask> = { deletedAt: null };

    if (filter?.authorId) {
      query.authorId = filter.authorId;
    }

    return this.model
      .find(query)
      .skip(pagination.pageSize * (pagination.page - 1))
      .limit(pagination.pageSize)
      .populate("author")
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      });
  }
}

export const taskRepository = new TaskRepository();
