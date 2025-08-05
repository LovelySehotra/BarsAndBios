# BarsAndBios Backend - Clean Architecture

A comprehensive REST API backend for the BarsAndBios hip-hop music review platform, built with Node.js, Express, TypeScript, and MongoDB using Clean Architecture principles.

## 🏗️ Architecture Overview

This project follows Clean Architecture principles with a class-based approach:

```
project-root/
│
├── src/
│   ├── application/
│   │   ├── services/
│   │   │   └── Auth/
│   │   │       ├── AuthService.ts
│   │   │       ├── JwtService.ts
│   │   │       └── index.ts
│   │   │
│   │   └── middleware/
│   │       ├── auth.middleware.ts
│   │       ├── error.middleware.ts
│   │       └── notFound.middleware.ts
│   │
│   ├── config/
│   │   ├── env.config.ts
│   │   ├── logger.ts
│   │   └── index.ts
│   │
│   ├── domain/
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── index.ts
│   │   │
│   │   └── dto/
│   │       ├── UserDto.ts
│   │       └── index.ts
│   │
│   ├── infrastructure/
│   │   ├── database.config.ts
│   │   └── index.ts
│   │
│   ├── interface/
│   │   ├── controllers/
│   │   │   ├── user.controller.ts
│   │   │   └── index.ts
│   │   │
│   │   └── routers/
│   │       ├── user.router.ts
│   │       └── index.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 🎯 Clean Architecture Layers

### **Domain Layer** (`src/domain/`)
- **Models**: Business entities (User, Artist, Album, etc.)
- **DTOs**: Data Transfer Objects for API communication
- **Interfaces**: Contracts and abstractions

### **Application Layer** (`src/application/`)
- **Services**: Business logic and use cases
- **Middleware**: Application-specific middleware
- **Validators**: Input validation logic

### **Infrastructure Layer** (`src/infrastructure/`)
- **Database**: Database connections and configurations
- **External Services**: Third-party integrations
- **File System**: File operations

### **Interface Layer** (`src/interface/`)
- **Controllers**: Request/response handling
- **Routers**: Route definitions and middleware
- **Presenters**: Data formatting for responses

## 🚀 Key Features

### ✅ **Class-Based Architecture**
- All components are implemented as classes
- Dependency injection through constructors
- Singleton pattern for configuration and services
- Clear separation of concerns

### ✅ **Domain-Driven Design**
- Rich domain models with business logic
- DTOs for data transfer
- Value objects and entities

### ✅ **Service Layer Pattern**
- Business logic encapsulated in services
- Reusable service methods
- Transaction management

### ✅ **Repository Pattern** (Ready for implementation)
- Data access abstraction
- Database agnostic design
- Easy testing and mocking

## 🛠 Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting
- **Architecture**: Clean Architecture

## 📁 Detailed Structure

### **Domain Layer**
```typescript
// src/domain/models/User.ts
export class User {
  private _id?: string;
  private _username: string;
  // ... other properties

  constructor(username: string, email: string, ...) {
    // Initialize user
  }

  // Business methods
  async hashPassword(): Promise<void> { ... }
  async matchPassword(password: string): Promise<boolean> { ... }
  getSignedJwtToken(): string { ... }
}
```

### **Application Services**
```typescript
// src/application/services/Auth/AuthService.ts
export class AuthService {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  async registerUser(userData: CreateUserDto): Promise<AuthResponseDto> {
    // Business logic for user registration
  }

  async loginUser(loginData: LoginUserDto): Promise<AuthResponseDto> {
    // Business logic for user login
  }
}
```

### **Interface Controllers**
```typescript
// src/interface/controllers/user.controller.ts
export class UserController {
  private authService: AuthService;
  private logger: Logger;

  constructor() {
    this.authService = new AuthService();
    this.logger = Logger.getInstance();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    // Handle registration request
  }
}
```

### **Configuration**
```typescript
// src/config/env.config.ts
export class EnvConfig {
  private static instance: EnvConfig;
  private config: { [key: string]: string | undefined };

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }

  public getPort(): number { ... }
  public getMongoUri(): string { ... }
  // ... other getters
}
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### **Installation**

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## 📚 API Endpoints

### **Authentication** (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user (protected)
- `PUT /profile` - Update profile (protected)
- `PUT /password` - Change password (protected)
- `POST /forgot-password` - Forgot password
- `PUT /reset-password/:token` - Reset password

## 🔐 Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: All inputs validated
- **Password Hashing**: bcrypt for security
- **JWT Expiration**: Configurable token expiry
- **Role-Based Access**: User, Reviewer, Admin roles
- **CORS Protection**: Frontend integration ready

## 🧪 Testing Strategy

### **Unit Tests**
- Domain models and business logic
- Service layer methods
- Utility functions

### **Integration Tests**
- API endpoints
- Database operations
- Authentication flows

### **E2E Tests**
- Complete user workflows
- API contract validation

## 📈 Performance Features

- **Compression**: Response compression
- **Rate Limiting**: API protection
- **Database Indexing**: Optimized queries
- **Caching**: Ready for Redis integration
- **Image Optimization**: Sharp for processing

## 🔄 Development Workflow

1. **Feature Development**
   - Create domain models
   - Implement business logic in services
   - Add controllers and routers
   - Write tests

2. **Code Quality**
   - ESLint for linting
   - Prettier for formatting
   - TypeScript for type safety

3. **Deployment**
   - Build process
   - Environment configuration
   - Health checks

## 🎯 Benefits of This Architecture

### **Maintainability**
- Clear separation of concerns
- Easy to understand and modify
- Consistent patterns

### **Testability**
- Business logic isolated in services
- Easy to mock dependencies
- Unit and integration tests

### **Scalability**
- Modular design
- Easy to add new features
- Performance optimizations

### **Flexibility**
- Database agnostic
- Easy to change implementations
- Plugin architecture ready

---

**🎵 Your BarsAndBios backend is now built with Clean Architecture principles!**

The new structure provides a solid foundation for scalable, maintainable, and testable code. Each layer has a specific responsibility, making the codebase easier to understand and extend. 