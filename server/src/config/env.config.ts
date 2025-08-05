export class EnvConfig {
  private static instance: EnvConfig;
  private config: { [key: string]: string | undefined };

  private constructor() {
    this.config = {
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || '5000',
      MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/hiphop-beat-report',
      MONGODB_URI_PROD: process.env.MONGODB_URI_PROD,
      JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || '900000',
      RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || '100',
      CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
      MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || '5242880',
      UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',
    };
  }

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }

  public getRequired(key: string): string {
    const value = this.config[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is required`);
    }
    return value;
  }

  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  public isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }

  public getPort(): number {
    return parseInt(this.config.PORT || '5000');
  }

  public getMongoUri(): string {
    if (this.isProduction() && this.config.MONGODB_URI_PROD) {
      return this.config.MONGODB_URI_PROD;
    }
    return this.config.MONGODB_URI || 'mongodb://localhost:27017/hiphop-beat-report';
  }

  public getJwtSecret(): string {
    return this.config.JWT_SECRET || 'fallback-secret';
  }

  public getJwtExpiresIn(): string {
    return this.config.JWT_EXPIRES_IN || '7d';
  }

  public getCorsOrigin(): string {
    return this.config.CORS_ORIGIN || 'http://localhost:5173';
  }

  public getRateLimitWindowMs(): number {
    return parseInt(this.config.RATE_LIMIT_WINDOW_MS || '900000');
  }

  public getRateLimitMaxRequests(): number {
    return parseInt(this.config.RATE_LIMIT_MAX_REQUESTS || '100');
  }

  public getMaxFileSize(): number {
    return parseInt(this.config.MAX_FILE_SIZE || '5242880');
  }

  public getUploadPath(): string {
    return this.config.UPLOAD_PATH || './uploads';
  }
} 