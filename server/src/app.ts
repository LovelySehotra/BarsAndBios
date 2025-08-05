import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import path from 'path';
import { fileURLToPath } from 'url';

import { EnvConfig } from './config/env.config';
import { Logger } from './config/logger';
import { DatabaseConfig } from './infrastructure/database.config';
import { UserRouter } from './interface/routers/user.router';
import { ErrorHandler } from './application/middleware/error.middleware';
import { NotFoundHandler } from './application/middleware/notFound.middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class App {
  private app: express.Application;
  private envConfig: EnvConfig;
  private logger: Logger;
  private databaseConfig: DatabaseConfig;

  constructor() {
    this.app = express();
    this.envConfig = EnvConfig.getInstance();
    this.logger = Logger.getInstance();
    this.databaseConfig = DatabaseConfig.getInstance();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS configuration
    this.app.use(cors({
      origin: this.envConfig.getCorsOrigin(),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: this.envConfig.getRateLimitWindowMs(),
      max: this.envConfig.getRateLimitMaxRequests(),
      message: {
        error: 'Too many requests from this IP, please try again later.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Speed limiting
    const speedLimiter = slowDown({
      windowMs: 15 * 60 * 1000, // 15 minutes
      delayAfter: 50, // allow 50 requests per 15 minutes, then...
      delayMs: 500, // begin adding 500ms of delay per request above 50
    });

    // Apply rate limiting to all routes
    this.app.use(limiter);
    this.app.use(speedLimiter);

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Compression middleware
    this.app.use(compression());

    // Logging middleware
    this.app.use(morgan('combined', {
      stream: {
        write: (message: string) => this.logger.info(message.trim()),
      },
    }));

    // Static files
    this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  }

  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'OK',
        message: 'Hip-Hop Beat Report API is running',
        timestamp: new Date().toISOString(),
        environment: this.envConfig.get('NODE_ENV'),
      });
    });

    // API routes
    const userRouter = new UserRouter();
    this.app.use('/api/auth', userRouter.getRouter());

    // API documentation endpoint
    this.app.get('/api', (req, res) => {
      res.json({
        message: 'BarsAndBios API',
        version: '1.0.0',
        endpoints: {
          auth: '/api/auth',
          health: '/health',
        },
      });
    });
  }

  private initializeErrorHandling(): void {
    const errorHandler = new ErrorHandler();
    const notFoundHandler = new NotFoundHandler();

    // 404 handler
    this.app.use(notFoundHandler.handle);

    // Error handler
    this.app.use(errorHandler.handle);
  }

  public async start(): Promise<void> {
    try {
      // Connect to database
      await this.databaseConfig.connect();

      // Start server
      const port = this.envConfig.getPort();
      this.app.listen(port, () => {
        this.logger.info(`🚀 Server running on port ${port} in ${this.envConfig.get('NODE_ENV')} mode`);
        this.logger.info(`📊 Health check: http://localhost:${port}/health`);
        this.logger.info(`📚 API docs: http://localhost:${port}/api`);
      });

      // Graceful shutdown
      process.on('SIGTERM', () => {
        this.logger.info('SIGTERM received, shutting down gracefully');
        this.shutdown();
      });

      process.on('SIGINT', () => {
        this.logger.info('SIGINT received, shutting down gracefully');
        this.shutdown();
      });

    } catch (error) {
      this.logger.error('Failed to start application:', error);
      process.exit(1);
    }
  }

  private async shutdown(): Promise<void> {
    try {
      await this.databaseConfig.disconnect();
      this.logger.info('Application shutdown complete');
      process.exit(0);
    } catch (error) {
      this.logger.error('Error during shutdown:', error);
      process.exit(1);
    }
  }

  public getApp(): express.Application {
    return this.app;
  }
} 