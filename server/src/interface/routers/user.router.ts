import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "@/application/services";
import { UseRequestDto, UseResponseDto } from "@/interface/middleware";
import {
  CreateUserDto,
  UpdateUserDto,
  GetUsersQueryDto,
  UpdateUserRoleDto,
  BulkDeleteUsersDto,
  UserResponseDto,
} from "@/application/dtos";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// Public routes
router.post(
  "/",
  UseRequestDto(CreateUserDto),
  UseResponseDto(UserResponseDto),
  userController.createUser
);

// Protected routes (add authentication middleware here if needed)
router.get(
  "/",
  UseRequestDto(GetUsersQueryDto),
  UseResponseDto(UserResponseDto),
  userController.getAllUsers
);

router.get(
  "/:id",
  UseRequestDto(GetUsersQueryDto),
  UseResponseDto(UserResponseDto),
  userController.getUserById
);

router.patch(
  "/:id",
  UseRequestDto(UpdateUserDto),
  UseResponseDto(UserResponseDto),
  userController.updateUser
);

router.delete(
  "/:id",
  UseRequestDto(GetUsersQueryDto),
  userController.deleteUser
);

// Admin only routes (add admin middleware here)
router.patch(
  "/:id/role",
  UseRequestDto(UpdateUserRoleDto),
  UseResponseDto(UserResponseDto),
  userController.updateUserRole
);

router.post(
  "/bulk-delete",
  UseRequestDto(BulkDeleteUsersDto),
  UseResponseDto(UserResponseDto),
  userController.bulkDeleteUsers
);

export default router;
