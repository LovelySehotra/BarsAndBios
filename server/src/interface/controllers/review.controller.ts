// controllers/review.controller.ts
import { ReviewService } from '@/application/services';
import { Request, Response, NextFunction } from 'express';


const reviewService = new ReviewService();

export class ReviewController {
  async listReviews(req: any, res: Response, next: NextFunction) {
    try {
      const filter = req.query;
      const pagination: any = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc'
      };
      const result = await reviewService.listReviews(filter, pagination, req?.user?.id);
      res.status(200).json({ success: true, data: result.reviews, pagination: result.pagination });
    } catch (err) {
      next(err);
    }
  }

  async toggleLike(req: any, res: Response, next: NextFunction) {
    try {
      const review = await reviewService.toggleLike(req.params.id, req.user!.id);
      res.status(200).json({ success: true, message: 'Like toggled successfully', data: review });
    } catch (err) {
      next(err);
    }
  }

  // async getAlbumReviews(req: any, res: Response, next: NextFunction) {
  //   try {
  //     const pagination: any = {
  //       page: req.query.page ? parseInt(req.query.page as string) : 1,
  //       limit: req.query.limit ? parseInt(req.query.limit as string) : 10
  //     };
  //     const result = await reviewService.getReviewsByAlbum(req.params.albumId, pagination, req.user?.id);
  //     res.status(200).json({ success: true, data: result.reviews, pagination: result.pagination });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}
