import express from 'express';

const router = express.Router();

// TODO: Implement album routes
// - GET /api/albums - Get all albums
// - GET /api/albums/:id - Get single album
// - POST /api/albums - Create new album
// - PUT /api/albums/:id - Update album
// - DELETE /api/albums/:id - Delete album
// - GET /api/albums/:id/reviews - Get album reviews
// - POST /api/albums/:id/reviews - Add review to album

router.get('/', (req, res) => {
  res.json({ message: 'Albums routes - Coming soon!' });
});

export default router; 