import { Model, Document as MongooseDocument, FilterQuery } from 'mongoose';
import { PaginationOptions } from '../../utils/pagination';
import { OrderOptions } from '../../utils/order';

export interface FindOptions<T> {
  order: OrderOptions;
  pagination: PaginationOptions;
  filter?: T;
  search?: string;
}

export class BaseRepository<T extends MongooseDocument> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async insert(data: object): Promise<T> {
    return await this.model.create(data);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().where({ deletedAt: null });
  }

  async findOneBy(query: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne({ ...query, deletedAt: null });
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).where({ deletedAt: null });
  }

  async findByIds(ids: string[]): Promise<T[]> {
    return await this.model.find().where({
      _id: {
        $in: ids,
      },
      deletedAt: null,
    });
  }

  async findBy(query: FilterQuery<T>): Promise<T[]> {
    return await this.model.find({ ...query, deletedAt: null });
  }

  async patchById(id: string, data: object): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async updateMany(ids: string[], requestData: object) {
    return await this.model.updateMany({});
  }

  async deleteById(id: string): Promise<T | null> {
    return await this.patchById(id, { deletedAt: new Date() });
  }
}
