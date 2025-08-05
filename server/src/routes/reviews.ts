import express from 'express';

const router = express.Router();

// TODO: Implement review routes
// - GET /api/reviews - Get all reviews
// - GET /api/reviews/:id - Get single review
// - POST /api/reviews - Create new review
// - PUT /api/reviews/:id - Update review
// - DELETE /api/reviews/:id - Delete review
// - GET /api/reviews/featured - Get featured reviews
// - POST /api/reviews/:id/like - Like review
// - POST /api/reviews/:id/dislike - Dislike review

router.get('/', (req, res) => {
  res.json({ message: 'Reviews routes - Coming soon!' });
});

export default router; 