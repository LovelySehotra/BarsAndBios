import { IReview, Review } from '../../domain/models/Review';
import { FilterQuery, PaginateOptions } from 'mongoose';

export class ReviewService {
  async createReview(reviewData: Partial<IReview>): Promise<IReview> {
    const review = new Review(reviewData);
    return await review.save();
  }

  async getReviewById(id: string): Promise<IReview | null> {
    return await Review.findById(id)
      .populate('album', 'title artist')
      .populate('author', 'username avatar')
      .populate('comments', 'content author');
  }

  async updateReview(id: string, updateData: Partial<IReview>): Promise<IReview | null> {
    return await Review.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
  }

  async deleteReview(id: string): Promise<IReview | null> {
    return await Review.findByIdAndDelete(id);
  }

  async listReviews(
    filter: FilterQuery<IReview> = {},
    options: PaginateOptions = { page: 1, limit: 10 }
  ) {
    const { page = 1, limit = 10, sort = { createdAt: -1 }, ...rest } = options;
    
    const reviews = await Review.paginate(filter, {
      page,
      limit,
      sort,
      ...rest,
      populate: [
        { path: 'album', select: 'title artist' },
        { path: 'author', select: 'username avatar' }
      ]
    });

    return reviews;
  }

  async getReviewsByAlbum(albumId: string, page: number = 1, limit: number = 10) {
    return this.listReviews(
      { album: albumId },
      { page, limit, sort: { createdAt: -1 } }
    );
  }

  async getReviewsByAuthor(authorId: string, page: number = 1, limit: number = 10) {
    return this.listReviews(
      { author: authorId },
      { page, limit, sort: { createdAt: -1 } }
    );
  }

  async searchReviews(query: string, page: number = 1, limit: number = 10) {
    return this.listReviews(
      { $text: { $search: query } },
      { 
        page, 
        limit, 
        sort: { score: { $meta: 'textScore' }, createdAt: -1 },
        select: 'title content rating createdAt',
      }
    );
  }

  async toggleLike(reviewId: string, userId: string): Promise<IReview | null> {
    const review = await Review.findById(reviewId);
    if (!review) return null;

    const likeIndex = review.likes.indexOf(userId);
    if (likeIndex === -1) {
      review.likes.push(userId);
    } else {
      review.likes.splice(likeIndex, 1);
    }
    
    return await review.save();
  }

  async addComment(reviewId: string, commentId: string): Promise<IReview | null> {
    return await Review.findByIdAndUpdate(
      reviewId,
      { $push: { comments: commentId } },
      { new: true }
    );
  }
}
