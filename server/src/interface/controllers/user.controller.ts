import { Request, Response, NextFunction } from "express";
import { UserService } from "@/application/services";
import {
  CreateUserDto,
  UpdateUserDto,
  GetUsersQueryDto,
  UserResponseDto,
  UpdateUserRoleDto,
  BulkDeleteUsersDto,
} from "@/application/dtos";
import { plainToInstance } from "class-transformer";

/**
 * Controller for handling user-related HTTP requests
 * Handles routing and request/response transformation
 */
export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * Create a new user
   */
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const newUser = await this.userService.createUser(userData);
      // Convert to response DTO to exclude sensitive data
      const userResponse = plainToInstance(
        UserResponseDto,
        newUser.toObject(),
        {
          excludeExtraneousValues: true,
        }
      );

      res.status(201).json({
        success: true,
        data: userResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get user by ID
   */
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      // Convert to response DTO
      const userResponse = plainToInstance(UserResponseDto, user.toObject(), {
        excludeExtraneousValues: true,
      });

      res.status(200).json({
        success: true,
        data: userResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update user
   */
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData: UpdateUserDto = req.body;

      const updatedUser = await this.userService.updateUser(id, updateData);

      // Convert to response DTO
      const userResponse = plainToInstance(
        UserResponseDto,
        updatedUser.toObject(),
        {
          excludeExtraneousValues: true,
        }
      );

      res.status(200).json({
        success: true,
        data: userResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete user
   */
  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all users with pagination and filtering
   */
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: GetUsersQueryDto = req.query as any;
      const result = await this.userService.getAllUsers(query);

      // Convert each user to response DTO
      const usersResponse = result.users.map((user) =>
        plainToInstance(UserResponseDto, user.toObject(), {
          excludeExtraneousValues: true,
        })
      );

      res.status(200).json({
        success: true,
        data: usersResponse,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update user role (Admin only)
   */
  updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { role }: UpdateUserRoleDto = req.body;

      const updatedUser = await this.userService.updateUser(id, { role });

      // Convert to response DTO
      const userResponse = plainToInstance(
        UserResponseDto,
        updatedUser.toObject(),
        {
          excludeExtraneousValues: true,
        }
      );

      res.status(200).json({
        success: true,
        data: userResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Bulk delete users (Admin only)
   */
  bulkDeleteUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userIds }: BulkDeleteUsersDto = req.body;

      // Delete users in parallel
      await Promise.all(userIds.map((id) => this.userService.deleteUser(id)));

      res.status(200).json({
        success: true,
        message: "Users deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
