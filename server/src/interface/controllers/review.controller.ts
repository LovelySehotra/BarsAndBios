import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../../application/services/review.service";
import { IReview } from "../../domain/models/Review";

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewData = { ...req.body, author: req.user?._id };
      const review = await this.reviewService.createReview(reviewData);
      res.status(201).json({
        success: true,
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };

  getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.getReviewById(req.params.id);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
      res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };

  updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.updateReview(
        req.params.id,
        req.body
      );
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
      res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.deleteReview(req.params.id);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  };

  listReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        page = 1,
        limit = 10,
        sort = "-createdAt",
        ...filters
      } = req.query;

      const result = await this.reviewService.listReviews(filters as any, {
        page: Number(page),
        limit: Math.min(Number(limit), 100),
        sort: sort as string,
      });

      res.status(200).json({
        success: true,
        data: result.docs,
        pagination: {
          total: result.totalDocs,
          pages: result.totalPages,
          page: result.page,
          limit: result.limit,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getAlbumReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await this.reviewService.getReviewsByAlbum(
        req.params.albumId,
        Number(page),
        Number(limit)
      );

      res.status(200).json({
        success: true,
        data: result.docs,
        pagination: {
          total: result.totalDocs,
          pages: result.totalPages,
          page: result.page,
          limit: result.limit,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getUserReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await this.reviewService.getReviewsByAuthor(
        req.params.userId,
        Number(page),
        Number(limit)
      );

      res.status(200).json({
        success: true,
        data: result.docs,
        pagination: {
          total: result.totalDocs,
          pages: result.totalPages,
          page: result.page,
          limit: result.limit,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  searchReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, page = 1, limit = 10 } = req.query;
      if (!q) {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }

      const result = await this.reviewService.searchReviews(
        q as string,
        Number(page),
        Number(limit)
      );

      res.status(200).json({
        success: true,
        data: result.docs,
        pagination: {
          total: result.totalDocs,
          pages: result.totalPages,
          page: result.page,
          limit: result.limit,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  toggleLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.toggleLike(
        req.params.id,
        req.user?._id
      );
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
      res.status(200).json({
        success: true,
        data: { likes: review.likes },
      });
    } catch (error) {
      next(error);
    }
  };

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.addComment(
        req.params.id,
        req.body.commentId
      );
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
      res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };
}
