import mongoose from 'mongoose';
import { EnvConfig } from '../config/env.config';
import { Logger } from '../config/logger';

export class DatabaseConfig {
  private static instance: DatabaseConfig;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      const envConfig = EnvConfig.getInstance();
      const logger = Logger.getInstance();
      const mongoUri = envConfig.getMongoUri();

      if (!mongoUri) {
        throw new Error('MongoDB URI is not defined in environment variables');
      }

      const conn = await mongoose.connect(mongoUri, {
        // MongoDB connection options
      });

      this.isConnected = true;
      logger.info(`📦 MongoDB Connected: ${conn.connection.host}`);

      // Handle connection events
      mongoose.connection.on('error', (err) => {
        logger.error('MongoDB connection error:', err);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected');
        this.isConnected = true;
      });

    } catch (error) {
      const logger = Logger.getInstance();
      logger.error('Database connection failed:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      const logger = Logger.getInstance();
      logger.info('MongoDB disconnected');
    } catch (error) {
      const logger = Logger.getInstance();
      logger.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  }

  public isConnectedToDatabase(): boolean {
    return this.isConnected;
  }

  public getConnection(): mongoose.Connection | null {
    return mongoose.connection.readyState === 1 ? mongoose.connection : null;
  }
} 