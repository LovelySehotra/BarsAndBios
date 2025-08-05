import express from 'express';

const router = express.Router();

// TODO: Implement culture routes
// - GET /api/culture - Get all culture articles
// - GET /api/culture/:id - Get single culture article
// - POST /api/culture - Create new culture article
// - PUT /api/culture/:id - Update culture article
// - DELETE /api/culture/:id - Delete culture article
// - GET /api/culture/featured - Get featured culture articles
// - GET /api/culture/category/:category - Get culture by category

router.get('/', (req, res) => {
  res.json({ message: 'Culture routes - Coming soon!' });
});

export default router; 