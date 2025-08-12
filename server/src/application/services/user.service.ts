import { AppError } from "@/interface/middleware";
import { IUser, User } from "../../domain/models/User";
import { CreateUserDto, UpdateUserDto } from "../dtos/user/user.dtos";

/**
 * Service class for handling user-related business logic and operations
 * Handles CRUD operations and business rules for users
 */
export class UserService {
  /**
   * Creates a new user in the system
   * @param {CreateUserDto} userData - The user data to create
   * @returns {Promise<User>} The created user
   * @throws {AppError} If user already exists or account is inactive
   */
  async createUser(userData: CreateUserDto): Promise<IUser> {
    const user = await User.findOne({ email: userData.email });
    if (user)
      throw new AppError("User already exists", 409, "USER_ALREADY_EXISTS");
    const newUser = await User.create(userData);
    if (!newUser)
      throw new AppError("User account is inactive", 403, "USER_INACTIVE");
    return newUser;
  }
  /**
   * Retrieves a user by their ID
   * @param {string} id - The ID of the user to retrieve
   * @returns {Promise<IUser>} The found user
   * @throws {AppError} If user is not found
   */
  async getUserById(id: string): Promise<IUser> {
    const user = await User.findById(id).select(
      "-password -verificationToken -resetPasswordToken -resetPasswordExpire"
    );
    if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");
    return user;
  }
  /**
   * Updates an existing user
   * @param {string} id - The ID of the user to update
   * @param {UpdateUserDto} updateData - The data to update
   * @returns {Promise<IUser>} The updated user
   * @throws {AppError} If user is not found
   */
  async updateUser(id: string, updateData: UpdateUserDto): Promise<IUser> {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select(
      "-password -verificationToken -resetPasswordToken -resetPasswordExpire"
    );

    if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");
    return user;
  }
  /**
   * Deletes a user from the system
   * @param {string} id - The ID of the user to delete
   * @returns {Promise<{success: boolean}>} Success status
   * @throws {AppError} If user is not found
   */
  async deleteUser(id: string): Promise<{ success: boolean }> {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");
    return { success: true };
  }
  /**
   * Retrieves a paginated list of users with filtering and sorting options
   * @param {Object} query - Query parameters for filtering and pagination
   * @param {string} [query.search] - Search term to filter users by name, email, etc.
   * @param {string} [query.role] - Filter users by role
   * @param {boolean} [query.isVerified] - Filter by verification status
   * @param {number} [query.page=1] - Page number for pagination
   * @param {number} [query.limit=10] - Number of items per page
   * @param {string} [query.sortBy=createdAt] - Field to sort by
   * @param {'asc'|'desc'} [query.sortOrder=desc] - Sort order
   * @returns {Promise<{users: User[], pagination: {total: number, page: number, limit: number, totalPages: number}}>}
   * @throws {AppError} If no users are found
   */
  async getAllUsers(query: any = {}): Promise<{
    users: IUser[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    // Build query
    const {
      search,
      role,
      isVerified,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;

    const queryObj: any = {};

    // Search functionality
    if (search) {
      queryObj.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by role
    if (role) {
      queryObj.role = role;
    }

    // Filter by verification status
    if (isVerified !== undefined) {
      queryObj.isVerified = isVerified === "true";
    }

    // Execute query with pagination
    const users = await User.find(queryObj)
      .select(
        "-password -verificationToken -resetPasswordToken -resetPasswordExpire"
      )
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    if (!users) throw new AppError("Users not found", 404, "USERS_NOT_FOUND");
    // Get total count for pagination
    const total = await User.countDocuments(queryObj);

    return {
      users,
      pagination: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
