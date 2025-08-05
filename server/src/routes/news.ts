import express from 'express';

const router = express.Router();

// TODO: Implement news routes
// - GET /api/news - Get all news articles
// - GET /api/news/:id - Get single news article
// - POST /api/news - Create new news article
// - PUT /api/news/:id - Update news article
// - DELETE /api/news/:id - Delete news article
// - GET /api/news/featured - Get featured news
// - GET /api/news/category/:category - Get news by category
// - POST /api/news/:id/view - Increment view count

router.get('/', (req, res) => {
  res.json({ message: 'News routes - Coming soon!' });
});

export default router; 