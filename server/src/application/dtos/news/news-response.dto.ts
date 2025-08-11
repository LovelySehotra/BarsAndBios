import { Expose, Type } from 'class-transformer';
import { BaseDto } from '../base.dto';

export class NewsResponseDto extends BaseDto {
  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  excerpt: string;

  @Expose()
  content: string;

  @Expose()
  author: string;

  @Expose()
  category: string;

  @Expose()
  tags: string[];

  @Expose()
  featuredImage: string;

  @Expose()
  images: string[];

  @Expose()
  featured: boolean;

  @Expose()
  published: boolean;

  @Expose()
  publishDate: Date;

  @Expose()
  readTime: number;

  @Expose()
  views: number;

  @Expose()
  likes: number;

  @Expose()
  shares: number;

  @Expose()
  comments: string[];

  @Expose()
  relatedArticles: string[];

  @Expose()
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}
