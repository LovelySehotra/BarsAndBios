import express from 'express';

const router = express.Router();

// TODO: Implement user routes
// - GET /api/users - Get all users (admin only)
// - GET /api/users/:id - Get user profile
// - PUT /api/users/:id - Update user profile
// - DELETE /api/users/:id - Delete user (admin only)
// - GET /api/users/:id/reviews - Get user's reviews
// - GET /api/users/:id/favorites - Get user's favorites

router.get('/', (req, res) => {
  res.json({ message: 'Users routes - Coming soon!' });
});

export default router; 