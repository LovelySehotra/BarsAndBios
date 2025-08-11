import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsIn,
  IsBoolean,
  IsDate,
  IsUrl,
  ValidateNested,
  IsObject,
} from "class-validator";
import { Type, Transform, Exclude } from "class-transformer";

// Social Links DTO
export class SocialLinksDto {
  @IsOptional()
  @IsUrl({}, { message: "Twitter URL must be a valid URL" })
  twitter?: string;

  @IsOptional()
  @IsUrl({}, { message: "Instagram URL must be a valid URL" })
  instagram?: string;

  @IsOptional()
  @IsUrl({}, { message: "Website URL must be a valid URL" })
  website?: string;
}

// Create User DTO
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: "Username cannot be more than 50 characters" })
  @Transform(({ value }) => value?.trim())
  username!: string;

  @IsEmail({}, { message: "Please provide a valid email" })
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: "First name cannot be more than 50 characters" })
  @Transform(({ value }) => value?.trim())
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: "Last name cannot be more than 50 characters" })
  @Transform(({ value }) => value?.trim())
  lastName!: string;

  @IsOptional()
  @IsString()
  @IsIn(["user", "reviewer", "admin"], {
    message: "Role must be user, reviewer, or admin",
  })
  role?: "user" | "reviewer" | "admin" = "user";

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: "Bio cannot be more than 500 characters" })
  bio?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  @IsObject()
  socialLinks?: SocialLinksDto;
}

// Update User DTO
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: "Username cannot be more than 50 characters" })
  @Transform(({ value }) => value?.trim())
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: "Please provide a valid email" })
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: "First name cannot be more than 50 characters" })
  @Transform(({ value }) => value?.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: "Last name cannot be more than 50 characters" })
  @Transform(({ value }) => value?.trim())
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsIn(["user", "reviewer", "admin"], {
    message: "Role must be user, reviewer, or admin",
  })
  role?: "user" | "reviewer" | "admin";

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: "Bio cannot be more than 500 characters" })
  bio?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  @IsObject()
  socialLinks?: SocialLinksDto;
}

// Login DTO
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  usernameOrEmail!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password!: string;
}

// Change Password DTO
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Current password must be at least 6 characters" })
  currentPassword!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "New password must be at least 6 characters" })
  newPassword!: string;
}

// Forgot Password DTO
export class ForgotPasswordDto {
  @IsEmail({}, { message: "Please provide a valid email" })
  @IsNotEmpty()
  email!: string;
}

// Reset Password DTO
export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  resetToken!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password!: string;
}

// Verify Email DTO
export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  verificationToken!: string;
}

// User Response DTO (for API responses - excludes sensitive data)
export class UserResponseDto {
  @Type(() => String)
  _id!: string;

  username!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  role!: "user" | "reviewer" | "admin";
  avatar?: string;
  bio?: string;
  socialLinks?: SocialLinksDto;
  isVerified!: boolean;

  @Type(() => Date)
  lastLogin?: Date;

  @Type(() => Date)
  createdAt!: Date;

  @Type(() => Date)
  updatedAt!: Date;

  // Exclude sensitive fields
  @Exclude()
  password?: string;

  @Exclude()
  verificationToken?: string;

  @Exclude()
  resetPasswordToken?: string;

  @Exclude()
  resetPasswordExpire?: Date;
}

// Query/Filter DTOs
export class GetUsersQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(["user", "reviewer", "admin"])
  role?: "user" | "reviewer" | "admin";

  @IsOptional()
  @IsString()
  @IsIn(["true", "false"])
  @Transform(({ value }) => value === "true")
  isVerified?: boolean;

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
    "username",
    "email",
    "firstName",
    "lastName",
  ])
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc";
}

// Update User Role DTO (Admin only)
export class UpdateUserRoleDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(["user", "reviewer", "admin"], {
    message: "Role must be user, reviewer, or admin",
  })
  role!: "user" | "reviewer" | "admin";
}

// Bulk Operations DTO
export class BulkDeleteUsersDto {
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  userIds!: string[];
}
