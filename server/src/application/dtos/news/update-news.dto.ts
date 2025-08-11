import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @IsNumber()
  @IsOptional()
  views?: number;

  @IsNumber()
  @IsOptional()
  likes?: number;

  @IsNumber()
  @IsOptional()
  shares?: number;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  comments?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  relatedArticles?: string[];
}
