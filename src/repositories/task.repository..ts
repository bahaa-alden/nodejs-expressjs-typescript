import ITask, { Task } from "../models/task.model";
import { BaseRepository } from "./base.repository";

export class TaskRepository extends BaseRepository<ITask> {
  constructor() {
    super(Task);
  }

  async findByIdForAuthor(id: string, authorId: string): Promise<ITask | null> {
    return this.model.findOne({ _id: id, authorId }).populate("author");
  }

  async findForAuthor(
    pageNumber: number,
    take: number,
    authorId: string
  ): Promise<ITask[]> {
    const limit = take || 100;
    const skip = (pageNumber - 1) * take || 0;
    return Task.find({
      authorId,
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  async findForUser(pageNumber: number, limit: number): Promise<ITask[]> {
    return Task.find({})
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .populate("author")
      .sort({ createdAt: -1 });
  }
}

export const taskRepository = new TaskRepository();
