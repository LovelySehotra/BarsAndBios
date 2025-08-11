import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayMaxSize,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsMongoId,
  ValidateNested,
  IsIn,
} from "class-validator";
import { Type, Transform, Exclude } from "class-transformer";
import mongoose from "mongoose";

// Create Review DTO
export class CreateReviewDto {
  @IsMongoId({ message: "Please provide a valid album ID" })
  @IsNotEmpty()
  album!: string;

  @IsNumber({}, { message: "Rating must be a number" })
  @Min(1, { message: "Rating must be at least 1" })
  @Max(5, { message: "Rating cannot exceed 5" })
  rating!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: "Title cannot be more than 200 characters" })
  @Transform(({ value }) => value?.trim())
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(100, { message: "Review must be at least 100 characters" })
  @MaxLength(5000, { message: "Review cannot be more than 5000 characters" })
  content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, {
    each: true,
    message: "Each pro cannot be more than 200 characters",
  })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(10, { message: "Cannot have more than 10 pros" })
  pros?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, {
    each: true,
    message: "Each con cannot be more than 200 characters",
  })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(10, { message: "Cannot have more than 10 cons" })
  cons?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, {
    each: true,
    message: "Each highlight cannot be more than 200 characters",
  })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(10, { message: "Cannot have more than 10 highlights" })
  highlights?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, {
    each: true,
    message: "Each lowlight cannot be more than 200 characters",
  })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(10, { message: "Cannot have more than 10 lowlights" })
  lowlights?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(20, { message: "Cannot have more than 20 tags" })
  tags?: string[] = [];
}

// Update Review DTO
export class UpdateReviewDto {
  @IsOptional()
  @IsNumber({}, { message: "Rating must be a number" })
  @Min(1, { message: "Rating must be at least 1" })
  @Max(5, { message: "Rating cannot exceed 5" })
  rating?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: "Title cannot be more than 200 characters" })
  @Transform(({ value }) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(100, { message: "Review must be at least 100 characters" })
  @MaxLength(5000, { message: "Review cannot be more than 5000 characters" })
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, {
    each: true,
    message: "Each pro cannot be more than 200 characters",
  })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(10, { message: "Cannot have more than 10 pros" })
  pros?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, {
    each: true,
    message: "Each con cannot be more than 200 characters",
  })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(10, { message: "Cannot have more than 10 cons" })
  cons?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, {
    each: true,
    message: "Each highlight cannot be more than 200 characters",
  })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(10, { message: "Cannot have more than 10 highlights" })
  highlights?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(200, {
    each: true,
    message: "Each lowlight cannot be more than 200 characters",
  })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(10, { message: "Cannot have more than 10 lowlights" })
  lowlights?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  @ArrayMaxSize(20, { message: "Cannot have more than 20 tags" })
  tags?: string[];
}

// Review Response DTO
export class ReviewResponseDto {
  @Type(() => String)
  _id!: string;

  @Type(() => String)
  album!: string;

  @Type(() => String)
  author!: string;

  rating!: number;
  title!: string;
  content!: string;
  pros!: string[];
  cons!: string[];
  highlights!: string[];
  lowlights!: string[];
  featured!: boolean;
  verified!: boolean;
  likes!: number;
  dislikes!: number;
  tags!: string[];
  readTime!: number;

  @Type(() => Date)
  createdAt!: Date;

  @Type(() => Date)
  updatedAt!: Date;

  // Optional populated fields
  @IsOptional()
  albumDetails?: any;

  @IsOptional()
  authorDetails?: any;

  @IsOptional()
  commentsCount?: number;
}

// Review Query/Filter DTO
export class GetReviewsQueryDto {
  @IsOptional()
  @IsMongoId({ message: "Please provide a valid album ID" })
  album?: string;

  @IsOptional()
  @IsMongoId({ message: "Please provide a valid author ID" })
  author?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1, { message: "Rating filter must be at least 1" })
  @Max(5, { message: "Rating filter cannot exceed 5" })
  rating?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1, { message: "Minimum rating must be at least 1" })
  @Max(5, { message: "Minimum rating cannot exceed 5" })
  minRating?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1, { message: "Maximum rating must be at least 1" })
  @Max(5, { message: "Maximum rating cannot exceed 5" })
  maxRating?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  tags?: string; // Comma-separated tags

  @IsOptional()
  @IsString()
  @IsIn(["true", "false"])
  @Transform(({ value }) => value === "true")
  featured?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(["true", "false"])
  @Transform(({ value }) => value === "true")
  verified?: boolean;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsIn(["createdAt", "updatedAt", "rating", "likes", "title", "readTime"])
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc";
}

// Like/Dislike Review DTO
export class LikeReviewDto {
  @IsString()
  @IsIn(["like", "dislike"], {
    message: "Action must be either like or dislike",
  })
  action!: "like" | "dislike";
}

// Admin Update Review DTO
export class AdminUpdateReviewDto {
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}

// Bulk Operations DTO
export class BulkDeleteReviewsDto {
  @IsArray()
  @IsMongoId({
    each: true,
    message: "Each review ID must be a valid MongoDB ObjectId",
  })
  @IsNotEmpty({ each: true })
  reviewIds!: string[];
}

// Review Statistics DTO
export class ReviewStatsResponseDto {
  totalReviews!: number;
  averageRating!: number;
  featuredReviews!: number;
  verifiedReviews!: number;

  ratingDistribution!: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };

  @Type(() => Date)
  lastReview?: Date;

  topTags!: { tag: string; count: number }[];
}

// Get Reviews by Album DTO
export class GetAlbumReviewsDto {
  @IsMongoId({ message: "Please provide a valid album ID" })
  albumId!: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1, { message: "Minimum rating must be at least 1" })
  @Max(5, { message: "Minimum rating cannot exceed 5" })
  minRating?: number;

  @IsOptional()
  @IsString()
  @IsIn(["true", "false"])
  @Transform(({ value }) => value === "true")
  verified?: boolean;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 5;

  @IsOptional()
  @IsString()
  @IsIn(["createdAt", "rating", "likes", "helpful"])
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc";
}
