import { Document, FilterQuery, Model, PopulateOptions, QueryOptions, UpdateQuery } from 'mongoose';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1 | 'asc' | 'desc'>;
  populate?: string | PopulateOptions | (string | PopulateOptions)[];
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findById(
    id: string, 
    options?: {
      select?: string | Record<string, number>;
      populate?: string | PopulateOptions | (string | PopulateOptions)[];
    }
  ): Promise<T | null>;
  findOne(
    conditions: FilterQuery<T>,
    options?: {
      select?: string | Record<string, number>;
      populate?: string | PopulateOptions | (string | PopulateOptions)[];
    }
  ): Promise<T | null>;
  update(
    id: string, 
    data: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  findAll(
    conditions?: FilterQuery<T>,
    options?: PaginationOptions & {
      select?: string | Record<string, number>;
    }
  ): Promise<PaginatedResult<T>>;
  count(conditions?: FilterQuery<T>): Promise<number>;
  exists(conditions: FilterQuery<T>): Promise<boolean>;
}
