// services/ReviewService.ts
import { FilterQuery, PopulateOptions } from 'mongoose';
import { IReview, Review } from '@/domain/models/Review';
import {  CreateReviewDto, UpdateReviewDto, } from '../dtos/review/review.dtos';
// import { 
//   CreateReviewDto, UpdateReviewDto, ReviewFilterDto, PaginationDto, ReviewResponseDto 
// } from '@/dto/ReviewDto';
// import { ReviewNotFoundError, DuplicateReviewError, InvalidRatingError } from '../errors/ReviewErrors';

export class ReviewService {
  // Repository Methods
  private async createReviewRecord(reviewData: Partial<IReview>): Promise<IReview> {
    const review = new Review(reviewData);
    return review.save();
  }

  private async findReviewById(id: string, populate: PopulateOptions[] = []): Promise<IReview | null> {
    let query = Review.findById(id).where({ isActive: true });
    populate.forEach(pop => query.populate(pop));
    return query.exec();
  }

  private async updateReviewRecord(id: string, updateData: Partial<IReview>): Promise<IReview | null> {
    return Review.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).where({ isActive: true });
  }

  private async deleteReviewRecord(id: string): Promise<boolean> {
    const result = await Review.findByIdAndUpdate(id, { isActive: false, updatedAt: new Date() }, { new: true });
    return !!result;
  }

  private async findReviewsWithPagination(
    filter: FilterQuery<IReview>,
    pagination: any,
    populate: PopulateOptions[] = []
  ) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    return Review.paginate(
      { ...filter, isActive: true },
      { page, limit, sort, populate, lean: false }
    );
  }

  private async reviewExists(filter: FilterQuery<IReview>): Promise<boolean> {
    const doc = await Review.findOne({ ...filter, isActive: true }).select('_id');
    return !!doc;
  }

  // Business Logic
  async createReview(createDto: any): Promise<any> {
    this.validateRating(createDto.rating);

    if (await this.reviewExists({ album: createDto.albumId, author: createDto.authorId })) {
      throw new Error('Duplicate review');
    }

    const review:any = await this.createReviewRecord({
      title: createDto.title,
      content: createDto.content,
      rating: createDto.rating,
      album: createDto.albumId,
      author: createDto.authorId
    });

    const populatedReview = await this.findReviewById(review._id, this.getDefaultPopulate());
    if (!populatedReview) throw new Error('Review not found');

    return this.mapToResponseDto(populatedReview);
  }

  async getReviewById(id: string, userId?: string): Promise<any> {
    const review = await this.findReviewById(id, this.getDefaultPopulate());
    if (!review) throw new Error('Review not found');
    return this.mapToResponseDto(review, userId);
  }

  async updateReview(id: string, updateDto: UpdateReviewDto, authorId: string): Promise<any> {
    const existingReview = await this.findReviewById(id);
    if (!existingReview) throw new Error('Review not found');
    if (existingReview.author.toString() !== authorId) throw new Error('Unauthorized to update this review');

    if (updateDto.rating !== undefined) this.validateRating(updateDto.rating);

    const updatedReview:any = await this.updateReviewRecord(id, updateDto);
    if (!updatedReview) throw new Error('Review not found');

    const populatedReview = await this.findReviewById(updatedReview._id, this.getDefaultPopulate());
    return this.mapToResponseDto(populatedReview!);
  }

  async deleteReview(id: string, authorId: string): Promise<void> {
    const existingReview = await this.findReviewById(id);
    if (!existingReview) throw new Error('Review not found');
    if (existingReview.author.toString() !== authorId) throw new Error('Unauthorized to delete this review');

    if (!(await this.deleteReviewRecord(id))) throw new Error('Failed to delete review');
  }

  async listReviews(filter: any = {}, pagination: any = {}, userId?: string) {
    const mongoFilter = this.buildMongoFilter(filter);
    const result = await this.findReviewsWithPagination(mongoFilter, pagination, this.getDefaultPopulate());

    return {
      reviews: result.docs.map(r => this.mapToResponseDto(r, userId)),
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
        itemsPerPage: result.limit,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage
      }
    };
  }

  async toggleLike(reviewId: string, userId: string): Promise<any> {
    const review = await this.findReviewById(reviewId);
    if (!review) throw new Error('Review not found');

    const updateData =[]

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, { new: true }).populate(this.getDefaultPopulate());
    if (!updatedReview) throw new Error('Review not found');

    return this.mapToResponseDto(updatedReview, userId);
  }

  // Helpers
  private validateRating(rating: number): void {
    if (!rating || rating < 1 || rating > 10 || !Number.isInteger(rating)) {
      throw new Error('Invalid rating');
    }
  }

  private buildMongoFilter(filter: any): FilterQuery<IReview> {
    const mongoFilter: FilterQuery<IReview> = {};
    if (filter.albumId) mongoFilter.album = filter.albumId;
    if (filter.authorId) mongoFilter.author = filter.authorId;
    if (filter.rating) {
      const r: any = {};
      if (filter.rating.min !== undefined) r.$gte = filter.rating.min;
      if (filter.rating.max !== undefined) r.$lte = filter.rating.max;
      if (Object.keys(r).length) mongoFilter.rating = r;
    }
    if (filter.search) mongoFilter.$text = { $search: filter.search };
    if (filter.isActive !== undefined) mongoFilter.isActive = filter.isActive;
    return mongoFilter;
  }

  private getDefaultPopulate(): PopulateOptions[] {
    return [
      { path: 'album', select: 'title artist' },
      { path: 'author', select: 'username avatar' }
    ];
  }

  private mapToResponseDto(review: IReview, userId?: string): any {
    return {
      id: review._id,
      title: review.title,
      content: review.content,
      rating: review.rating,
      album: review.album ? { id: (review.album as any)._id, title: (review.album as any).title, artist: (review.album as any).artist } : null,
      author: review.author ? { id: (review.author as any)._id, username: (review.author as any).username, avatar: (review.author as any).avatar } : null,
      likesCount: review.likes,
      commentsCount: review.comments,
      isLikedByUser: userId ? review.likes : undefined,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    };
  }
}
