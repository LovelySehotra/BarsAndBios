# BarsAndBios Backend API

A comprehensive REST API backend for the BarsAndBios hip-hop music review platform, built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Artist Management**: CRUD operations for hip-hop artists with detailed profiles
- **Album Reviews**: Comprehensive review system with ratings and analysis
- **News & Culture**: Content management for hip-hop news and culture articles
- **User Management**: User profiles, reviews, and social features
- **File Uploads**: Image upload support for artists, albums, and content
- **Search & Filtering**: Advanced search capabilities across all entities
- **Rate Limiting**: API protection with rate limiting and speed limiting
- **Logging**: Comprehensive logging with Winston
- **Validation**: Input validation with express-validator
- **Error Handling**: Centralized error handling with custom error responses

## 🛠 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Logging**: Winston
- **File Uploads**: Multer + Sharp
- **Security**: Helmet, CORS, Rate Limiting
- **Image Processing**: Sharp
- **Cloud Storage**: Cloudinary (optional)

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration
│   ├── middleware/
│   │   ├── auth.ts              # Authentication middleware
│   │   ├── errorHandler.ts      # Error handling middleware
│   │   └── notFound.ts          # 404 middleware
│   ├── models/
│   │   ├── User.ts              # User model
│   │   ├── Artist.ts            # Artist model
│   │   ├── Album.ts             # Album model
│   │   ├── Review.ts            # Review model
│   │   └── News.ts              # News model
│   ├── routes/
│   │   ├── auth.ts              # Authentication routes
│   │   ├── artists.ts           # Artist routes
│   │   ├── albums.ts            # Album routes
│   │   ├── reviews.ts           # Review routes
│   │   ├── news.ts              # News routes
│   │   ├── culture.ts           # Culture routes
│   │   ├── users.ts             # User routes
│   │   └── uploads.ts           # Upload routes
│   ├── utils/
│   │   └── logger.ts            # Winston logger
│   └── index.ts                 # Main server file
├── logs/                        # Log files
├── uploads/                     # Uploaded files
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
└── env.example                 # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
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
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/hiphop-beat-report
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:5173
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

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password
- `POST /api/auth/forgot-password` - Forgot password
- `PUT /api/auth/reset-password/:token` - Reset password

### Artists
- `GET /api/artists` - Get all artists (with pagination, filtering, search)
- `GET /api/artists/:id` - Get single artist
- `POST /api/artists` - Create new artist (Admin/Reviewer)
- `PUT /api/artists/:id` - Update artist (Admin/Reviewer)
- `DELETE /api/artists/:id` - Delete artist (Admin)
- `GET /api/artists/:id/albums` - Get artist's albums
- `GET /api/artists/search` - Search artists

### Albums
- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get single album
- `POST /api/albums` - Create new album
- `PUT /api/albums/:id` - Update album
- `DELETE /api/albums/:id` - Delete album
- `GET /api/albums/:id/reviews` - Get album reviews

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get single review
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/reviews/featured` - Get featured reviews

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/:id` - Get single news article
- `POST /api/news` - Create new news article
- `PUT /api/news/:id` - Update news article
- `DELETE /api/news/:id` - Delete news article
- `GET /api/news/featured` - Get featured news

### Culture
- `GET /api/culture` - Get all culture articles
- `GET /api/culture/:id` - Get single culture article
- `POST /api/culture` - Create new culture article
- `PUT /api/culture/:id` - Update culture article
- `DELETE /api/culture/:id` - Delete culture article

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin)

### Uploads
- `POST /api/uploads/image` - Upload image
- `POST /api/uploads/avatar` - Upload avatar
- `DELETE /api/uploads/:id` - Delete uploaded file

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **user**: Regular user, can read content and write reviews
- **reviewer**: Can create and edit reviews, artists, albums
- **admin**: Full access to all features

## 📊 Database Models

### User
- Authentication fields (username, email, password)
- Profile information (firstName, lastName, bio, avatar)
- Social links and preferences
- Role-based permissions

### Artist
- Basic info (name, stageName, bio, image)
- Genre classification and hometown
- Active years and record labels
- Social media links and discography
- Verification and featured status

### Album
- Album details (title, type, releaseDate, coverArt)
- Track listing with duration and features
- Genre classification and producer info
- Sales data and streaming links
- Review aggregation and ratings

### Review
- Review content (title, content, rating)
- Pros/cons and highlights/lowlights
- Author and album references
- Engagement metrics (likes, dislikes)
- Tags and read time calculation

### News
- Article content (title, excerpt, content)
- Author and category classification
- Featured images and SEO metadata
- Publishing controls and engagement metrics

## 🛡 Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configured for frontend integration
- **Helmet**: Security headers
- **Password Hashing**: bcrypt for secure password storage
- **JWT Expiration**: Configurable token expiration
- **Error Handling**: Secure error responses

## 📝 Logging

The application uses Winston for structured logging:

- **Console**: Colored output for development
- **File**: Rotating log files for production
- **Error Tracking**: Separate error and exception logs
- **Request Logging**: HTTP request/response logging

## 🚀 Deployment

### Environment Variables

Required environment variables:
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: JWT expiration time
- `CORS_ORIGIN`: Frontend URL for CORS

Optional variables:
- `CLOUDINARY_*`: Cloud storage configuration
- `SMTP_*`: Email service configuration
- `RATE_LIMIT_*`: Rate limiting configuration

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-production-secret
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📈 Performance

- **Compression**: Response compression for faster loading
- **Rate Limiting**: API protection and performance optimization
- **Database Indexing**: Optimized queries with proper indexing
- **Caching**: Ready for Redis integration
- **Image Optimization**: Sharp for image processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api` endpoint
- Review the logs in the `logs/` directory

---

**BarsAndBios Backend API** - Powering the future of hip-hop music reviews 🎵 