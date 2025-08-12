import { Model, Document } from 'mongoose';
import { BaseRepository } from './base/BaseRepository';
import { IRepository } from './interfaces/IRepository';

export class RepositoryFactory {
  static createRepository<T extends Document>(
    model: Model<T>
  ): IRepository<T> {
    return new BaseRepository<T>(model);
  }
}

// Example of creating a typed repository for a specific model
// Replace 'YourModel' with your actual Mongoose model type
export const createTypedRepository = <T extends Document>(
  model: Model<T>
): IRepository<T> => {
  return RepositoryFactory.createRepository<T>(model);
};
