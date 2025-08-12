import { IsString, IsArray, IsOptional, IsBoolean, IsDateString, IsNumber, IsMongoId, ArrayMinSize, ArrayMaxSize, MaxLength, MinLength, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export const NEWS_CATEGORIES = [
  'Breaking News',
  'Album Releases',
  'Artist Interviews',
  'Industry News',
  'Culture',
  'Awards',
  'Events',
  'Technology',
  'Politics',
  'Social Issues',
  'Fashion',
  'Sports',
  'Other'
] as const;

export type NewsCategory = typeof NEWS_CATEGORIES[number];

export class SeoDto {
  @IsString()
  @IsOptional()
  @MaxLength(60, { message: 'Meta title cannot be more than 60 characters' })
  metaTitle?: string;

  @IsString()
  @IsOptional()
  @MaxLength(160, { message: 'Meta description cannot be more than 160 characters' })
  metaDescription?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keywords?: string[];
}

export class CreateNewsDto {
  @IsString()
  @MaxLength(200, { message: 'Title cannot be more than 200 characters' })
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @MaxLength(300, { message: 'Excerpt cannot be more than 300 characters' })
  excerpt: string;

  @IsString()
  @MinLength(100, { message: 'Content must be at least 100 characters' })
  content: string;

  @IsMongoId()
  author: string;

  @IsString()
  @IsIn(NEWS_CATEGORIES, { message: 'Invalid category' })
  category: NewsCategory;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  featuredImage: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsDateString()
  @IsOptional()
  publishDate?: Date;

  @IsOptional()
  seo?: SeoDto;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  relatedArticles?: string[];
}

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Title cannot be more than 200 characters' })
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300, { message: 'Excerpt cannot be more than 300 characters' })
  excerpt?: string;

  @IsString()
  @IsOptional()
  @MinLength(100, { message: 'Content must be at least 100 characters' })
  content?: string;

  @IsString()
  @IsOptional()
  @IsIn(NEWS_CATEGORIES, { message: 'Invalid category' })
  category?: NewsCategory;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  featuredImage?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsDateString()
  @IsOptional()
  publishDate?: Date;

  @IsOptional()
  seo?: SeoDto;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  relatedArticles?: string[];
}

export class NewsQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  published?: boolean;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsString()
  @IsOptional()
  sortBy?: string = '-publishDate';
}

export class NewsResponseDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: NewsCategory;
  tags: string[];
  featuredImage: string;
  images: string[];
  featured: boolean;
  published: boolean;
  publishDate: Date;
  readTime: number;
  views: number;
  likes: number;
  shares: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  relatedArticles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export class NewsListResponseDto {
  data: NewsResponseDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}