import express from 'express';
import { body, validationResult, query } from 'express-validator';
import { Artist } from '../models/Artist.js';
import { Album } from '../models/Album.js';
import { protect, authorize } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// @desc    Get all artists
// @route   GET /api/artists
// @access  Public
router.get('/', [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('genre')
    .optional()
    .isString()
    .withMessage('Genre must be a string'),
  query('search')
    .optional()
    .isString()
    .withMessage('Search must be a string'),
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  query('verified')
    .optional()
    .isBoolean()
    .withMessage('Verified must be a boolean'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Artist.countDocuments();

    let query: any = {};

    // Filter by genre
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    // Filter by featured
    if (req.query.featured !== undefined) {
      query.featured = req.query.featured === 'true';
    }

    // Filter by verified
    if (req.query.verified !== undefined) {
      query.verified = req.query.verified === 'true';
    }

    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search as string };
    }

    const artists = await Artist.find(query)
      .sort({ featured: -1, followers: -1, createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    // Pagination result
    const pagination: any = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.json({
      success: true,
      count: artists.length,
      pagination,
      data: artists,
    });
  } catch (error) {
    logger.error('Get artists error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get single artist
// @route   GET /api/artists/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found',
      });
    }

    // Get artist's albums
    const albums = await Album.find({ artist: req.params.id })
      .sort({ releaseDate: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        artist,
        albums,
      },
    });
  } catch (error) {
    logger.error('Get artist error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Create new artist
// @route   POST /api/artists
// @access  Private (Admin/Reviewer)
router.post('/', protect, authorize('admin', 'reviewer'), [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('stageName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Stage name must be between 1 and 100 characters'),
  body('bio')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Bio must be between 10 and 2000 characters'),
  body('image')
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('genre')
    .isArray({ min: 1 })
    .withMessage('At least one genre is required'),
  body('hometown')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Hometown is required'),
  body('activeYears.start')
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Start year must be between 1900 and current year'),
], async (req: any, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const artist = await Artist.create(req.body);

    res.status(201).json({
      success: true,
      data: artist,
    });
  } catch (error) {
    logger.error('Create artist error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Update artist
// @route   PUT /api/artists/:id
// @access  Private (Admin/Reviewer)
router.put('/:id', protect, authorize('admin', 'reviewer'), [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('stageName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Stage name must be between 1 and 100 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Bio must be between 10 and 2000 characters'),
  body('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),
], async (req: any, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!artist) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found',
      });
    }

    res.json({
      success: true,
      data: artist,
    });
  } catch (error) {
    logger.error('Update artist error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Delete artist
// @route   DELETE /api/artists/:id
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found',
      });
    }

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    logger.error('Delete artist error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Get artist's albums
// @route   GET /api/artists/:id/albums
// @access  Public
router.get('/:id/albums', [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Album.countDocuments({ artist: req.params.id });

    const albums = await Album.find({ artist: req.params.id })
      .sort({ releaseDate: -1 })
      .limit(limit)
      .skip(startIndex);

    // Pagination result
    const pagination: any = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.json({
      success: true,
      count: albums.length,
      pagination,
      data: albums,
    });
  } catch (error) {
    logger.error('Get artist albums error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// @desc    Search artists
// @route   GET /api/artists/search
// @access  Public
router.get('/search', [
  query('q')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Search query is required'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { q } = req.query;
    const limit = parseInt(req.query.limit as string) || 10;

    const artists = await Artist.find({
      $text: { $search: q as string },
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit);

    res.json({
      success: true,
      count: artists.length,
      data: artists,
    });
  } catch (error) {
    logger.error('Search artists error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router; 