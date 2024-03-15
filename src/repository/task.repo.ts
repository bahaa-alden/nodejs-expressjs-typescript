import { Types } from "mongoose";
import Task, { TaskModel } from "../models/task.model";

export class TaskRepo {
  AUTHOR_DETAIL = "name";

  // create task
  async create(task: Task): Promise<Task> {
    const createdTask = await TaskModel.create(task);

    return createdTask.toObject();
  }

  // update task by id
  async update(
    id: Types.ObjectId,
    task: Task,
    authorId: Types.ObjectId
  ): Promise<Task | null> {
    return TaskModel.findOneAndUpdate(
      { _id: id, author: { _id: authorId } },
      task,
      {
        new: true,
        runValidators: true,
      }
    ).populate("author", this.AUTHOR_DETAIL);
  }

  // delete task by id
  async delete(
    id: Types.ObjectId,
    authorId: Types.ObjectId
  ): Promise<Task | null> {
    return TaskModel.findOneAndRemove({ _id: id, author: { _id: authorId } });
  }

  // get task by id
  async findOneById(
    id: Types.ObjectId,
    authorId: Types.ObjectId
  ): Promise<Task | null> {
    return TaskModel.findOne({ _id: id, author: { _id: authorId } }).populate(
      "author",
      this.AUTHOR_DETAIL
    );
  }

  // get all tasks for author
  async findAllForAuthor(
    pageNumber: number,
    take: number,
    authorId: Types.ObjectId
  ): Promise<Task[]> {
    const limit = take || 100;
    const skip = (pageNumber - 1) * take || 0;
    return TaskModel.find({
      author: { _id: authorId },
    })
      .select("-author")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  // get all tasks
  async findAll(pageNumber: number, limit: number): Promise<Task[]> {
    return TaskModel.find({})
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .populate("author", this.AUTHOR_DETAIL)
      .sort({ createdAt: -1 });
  }
}
