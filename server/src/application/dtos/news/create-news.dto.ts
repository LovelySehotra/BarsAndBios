import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean, IsDateString, IsNumber, IsMongoId } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[] = [];

  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[] = [];

  @IsBoolean()
  @IsOptional()
  featured: boolean = false;

  @IsBoolean()
  @IsOptional()
  published: boolean = false;

  @IsDateString()
  @IsOptional()
  publishDate?: string | Date;

  @IsNumber()
  @IsOptional()
  readTime: number = 5; // Default 5 minutes

  @IsObject()
  @IsOptional()
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}
