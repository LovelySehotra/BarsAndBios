import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  Min,
  Max,
  MaxLength,
  IsUrl,
  IsMongoId,
  ValidateNested,
  IsIn,
} from "class-validator";
import { Type, Transform } from "class-transformer";

// Valid genres enum
const VALID_GENRES = [
  "Hip-Hop",
  "Trap",
  "Conscious Rap",
  "Alternative Hip-Hop",
  "Gangsta Rap",
  "Boom Bap",
  "Drill",
  "Mumble Rap",
  "Experimental Hip-Hop",
  "Jazz Rap",
  "Political Hip-Hop",
  "Pop Rap",
  "R&B",
  "Soul",
  "Funk",
  "Reggae",
  "Afrobeat",
  "Grime",
  "UK Drill",
  "Other",
] as const;

// Active Years DTO
export class ActiveYearsDto {
  @IsNumber({}, { message: "Start year must be a number" })
  @Min(1900, { message: "Start year must be after 1900" })
  @Max(new Date().getFullYear(), {
    message: "Start year cannot be in the future",
  })
  start!: number;

  @IsOptional()
  @IsNumber({}, { message: "End year must be a number" })
  @Min(1900, { message: "End year must be after 1900" })
  @Max(new Date().getFullYear(), {
    message: "End year cannot be in the future",
  })
  end?: number;
}

// Social Media DTO
export class SocialMediaDto {
  @IsOptional()
  @IsUrl({}, { message: "Instagram URL must be valid" })
  instagram?: string;

  @IsOptional()
  @IsUrl({}, { message: "Twitter URL must be valid" })
  twitter?: string;

  @IsOptional()
  @IsUrl({}, { message: "YouTube URL must be valid" })
  youtube?: string;

  @IsOptional()
  @IsUrl({}, { message: "Spotify URL must be valid" })
  spotify?: string;

  @IsOptional()
  @IsUrl({}, { message: "Website URL must be valid" })
  website?: string;
}

// Create Artist DTO
export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: "Name cannot be more than 100 characters" })
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: "Real name cannot be more than 100 characters" })
  @Transform(({ value }) => value?.trim())
  realName?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: "Stage name cannot be more than 100 characters" })
  @Transform(({ value }) => value?.trim())
  stageName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000, { message: "Bio cannot be more than 2000 characters" })
  bio!: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: "Image must be a valid URL" })
  image!: string;

  @IsArray()
  @ArrayMinSize(1, { message: "Please add at least one genre" })
  @ArrayMaxSize(5, { message: "Cannot have more than 5 genres" })
  @IsString({ each: true })
  @IsIn(VALID_GENRES, { each: true, message: "Invalid genre selected" })
  genre!: string[];

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  hometown!: string;

  @ValidateNested()
  @Type(() => ActiveYearsDto)
  activeYears!: ActiveYearsDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10, { message: "Cannot have more than 10 labels" })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  labels?: string[] = [];

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  socialMedia?: SocialMediaDto;

  @IsOptional()
  @IsNumber({}, { message: "Followers must be a number" })
  @Min(0, { message: "Followers cannot be negative" })
  followers?: number = 0;

  @IsOptional()
  @IsNumber({}, { message: "Monthly listeners must be a number" })
  @Min(0, { message: "Monthly listeners cannot be negative" })
  monthlyListeners?: number = 0;
}

// Update Artist DTO
export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: "Name cannot be more than 100 characters" })
  @Transform(({ value }) => value?.trim())
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: "Real name cannot be more than 100 characters" })
  @Transform(({ value }) => value?.trim())
  realName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: "Stage name cannot be more than 100 characters" })
  @Transform(({ value }) => value?.trim())
  stageName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000, { message: "Bio cannot be more than 2000 characters" })
  bio?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: "Image must be a valid URL" })
  image?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: "Please add at least one genre" })
  @ArrayMaxSize(5, { message: "Cannot have more than 5 genres" })
  @IsString({ each: true })
  @IsIn(VALID_GENRES, { each: true, message: "Invalid genre selected" })
  genre?: string[];

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  hometown?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ActiveYearsDto)
  activeYears?: ActiveYearsDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10, { message: "Cannot have more than 10 labels" })
  @Transform(
    ({ value }) =>
      value?.map((item: string) => item?.trim()).filter(Boolean) || []
  )
  labels?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  socialMedia?: SocialMediaDto;

  @IsOptional()
  @IsNumber({}, { message: "Followers must be a number" })
  @Min(0, { message: "Followers cannot be negative" })
  followers?: number;

  @IsOptional()
  @IsNumber({}, { message: "Monthly listeners must be a number" })
  @Min(0, { message: "Monthly listeners cannot be negative" })
  monthlyListeners?: number;
}

// Artist Response DTO
export class ArtistResponseDto {
  @Type(() => String)
  _id!: string;

  name!: string;
  realName?: string;
  stageName!: string;
  bio!: string;
  image!: string;
  genre!: string[];
  hometown!: string;
  activeYears!: ActiveYearsDto;
  labels!: string[];
  socialMedia?: SocialMediaDto;
  featured!: boolean;
  verified!: boolean;
  followers!: number;
  monthlyListeners!: number;

  @Type(() => Date)
  createdAt!: Date;

  @Type(() => Date)
  updatedAt!: Date;

  // Optional populated fields
  @IsOptional()
  discography?: any[];

  @IsOptional()
  discographyCount?: number;

  @IsOptional()
  averageRating?: number;

  @IsOptional()
  totalReviews?: number;
}

// Artist Query/Filter DTO
export class GetArtistsQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(VALID_GENRES, { message: "Invalid genre filter" })
  genre?: string;

  @IsOptional()
  @IsString()
  hometown?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1900, { message: "Start year must be after 1900" })
  activeFrom?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1900, { message: "End year must be after 1900" })
  activeTo?: number;

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
  @IsIn(["true", "false"])
  @Transform(({ value }) => value === "true")
  active?: boolean; // Artists without end year

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(0)
  minFollowers?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(0)
  minMonthlyListeners?: number;

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
  @IsIn([
    "createdAt",
    "updatedAt",
    "name",
    "stageName",
    "followers",
    "monthlyListeners",
    "activeYears.start",
  ])
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc";
}

// Admin Update Artist DTO
export class AdminUpdateArtistDto {
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsNumber({}, { message: "Followers must be a number" })
  @Min(0, { message: "Followers cannot be negative" })
  followers?: number;

  @IsOptional()
  @IsNumber({}, { message: "Monthly listeners must be a number" })
  @Min(0, { message: "Monthly listeners cannot be negative" })
  monthlyListeners?: number;
}

// Add Album to Discography DTO
export class AddAlbumToDiscographyDto {
  @IsMongoId({ message: "Please provide a valid album ID" })
  @IsNotEmpty()
  albumId!: string;
}

// Remove Album from Discography DTO
export class RemoveAlbumFromDiscographyDto {
  @IsMongoId({ message: "Please provide a valid album ID" })
  @IsNotEmpty()
  albumId!: string;
}

// Bulk Operations DTO
export class BulkDeleteArtistsDto {
  @IsArray()
  @IsMongoId({
    each: true,
    message: "Each artist ID must be a valid MongoDB ObjectId",
  })
  @IsNotEmpty({ each: true })
  artistIds!: string[];
}

// Artist Statistics DTO
export class ArtistStatsResponseDto {
  totalArtists!: number;
  featuredArtists!: number;
  verifiedArtists!: number;
  activeArtists!: number;

  genreDistribution!: { genre: string; count: number }[];

  topLabels!: { label: string; count: number }[];

  averageFollowers!: number;
  averageMonthlyListeners!: number;

  @Type(() => Date)
  newestArtist?: Date;

  totalDiscographyItems!: number;
}

// Search Artists DTO
export class SearchArtistsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, {
    message: "Search query cannot be more than 100 characters",
  })
  query!: string;

  @IsOptional()
  @IsString()
  @IsIn(VALID_GENRES, { message: "Invalid genre filter" })
  genre?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 20;
}

// Get Artists by Genre DTO
export class GetArtistsByGenreDto {
  @IsString()
  @IsIn(VALID_GENRES, { message: "Invalid genre" })
  genre!: string;

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
  @IsIn(["followers", "monthlyListeners", "name", "createdAt"])
  sortBy?: string = "followers";

  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc";
}
