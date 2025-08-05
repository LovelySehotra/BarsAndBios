import express from 'express';

const router = express.Router();

// TODO: Implement upload routes
// - POST /api/uploads/image - Upload image
// - POST /api/uploads/avatar - Upload avatar
// - DELETE /api/uploads/:id - Delete uploaded file

router.get('/', (req, res) => {
  res.json({ message: 'Uploads routes - Coming soon!' });
});

export default router; 