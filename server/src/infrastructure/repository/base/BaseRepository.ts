import { Document, FilterQuery, Model, PopulateOptions, QueryOptions, UpdateQuery } from 'mongoose';
import { IRepository, PaginatedResult, PaginationOptions } from '../interfaces/IRepository';

export class BaseRepository<T extends Document> implements IRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return await document.save();
  }

  async findById(
    id: string,
    options: {
      select?: string | Record<string, number>;
      populate?: string | PopulateOptions | (string | PopulateOptions)[];
    } = {}
  ): Promise<T | null> {
    let query = this.model.findById(id);

    if (options.select) {
      query = query.select(options.select);
    }

    if (options.populate) {
      query = query.populate(options.populate as any);
    }

    return await query.exec();
  }

  async findOne(
    conditions: FilterQuery<T>,
    options: {
      select?: string | Record<string, number>;
      populate?: string | PopulateOptions | (string | PopulateOptions)[];
    } = {}
  ): Promise<T | null> {
    let query = this.model.findOne(conditions);

    if (options.select) {
      query = query.select(options.select);
    }

    if (options.populate) {
      query = query.populate(options.populate as any);
    }

    return await query.exec();
  }

  async update(
    id: string,
    data: UpdateQuery<T>,
    options: QueryOptions = { new: true, runValidators: true }
  ): Promise<T | null> {
    return await this.model
      .findByIdAndUpdate(id, data, options)
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findAll(
    conditions: FilterQuery<T> = {},
    options: PaginationOptions & {
      select?: string | Record<string, number>;
    } = {}
  ): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 10, sort, select, populate } = options;
    const skip = (page - 1) * limit;

    let query = this.model.find(conditions);

    if (select) {
      query = query.select(select);
    }

    if (sort) {
      query = query.sort(sort);
    }

    if (populate) {
      query = query.populate(populate as any);
    }

    const [data, total] = await Promise.all([
      query.skip(skip).limit(limit).exec(),
      this.count(conditions),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async count(conditions: FilterQuery<T> = {}): Promise<number> {
    return await this.model.countDocuments(conditions).exec();
  }

  async exists(conditions: FilterQuery<T>): Promise<boolean> {
    const count = await this.model.countDocuments(conditions).exec();
    return count > 0;
  }

  // Additional helper methods can be added here
  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true, runValidators: true }
  ): Promise<T | null> {
    return await this.model
      .findByIdAndUpdate(id, update, options)
      .exec();
  }

  async findOneAndUpdate(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true, runValidators: true }
  ): Promise<T | null> {
    return await this.model
      .findOneAndUpdate(conditions, update, options)
      .exec();
  }
}
