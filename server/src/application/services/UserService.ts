import { User } from "../../domain/models/User";
import { CreateUserDto, UpdateUserDto } from "../dtos/user/user.dtos";

export class UserService {
  async createUser(userData: CreateUserDto) {
    const user = await User.create(userData);
    return user;
  }

  async getUserById(id: string) {
    const user = await User.findById(id).select('-password -verificationToken -resetPasswordToken -resetPasswordExpire');
    if (!user) throw new Error('404::User not found');
    return user;
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -verificationToken -resetPasswordToken -resetPasswordExpire');
    
    if (!user) throw new Error('404::User not found');
    return user;
  }

  async deleteUser(id: string) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('404::User not found');
    return { success: true };
  }

  async getAllUsers(query: any = {}) {
    // Build query
    const { search, role, isVerified, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    
    const queryObj: any = {};
    
    // Search functionality
    if (search) {
      queryObj.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by role
    if (role) {
      queryObj.role = role;
    }
    
    // Filter by verification status
    if (isVerified !== undefined) {
      queryObj.isVerified = isVerified === 'true';
    }
    
    // Execute query with pagination
    const users = await User.find(queryObj)
      .select('-password -verificationToken -resetPasswordToken -resetPasswordExpire')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    // Get total count for pagination
    const total = await User.countDocuments(queryObj);
    
    return {
      users,
      pagination: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
