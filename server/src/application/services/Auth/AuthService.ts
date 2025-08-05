import { User, UserModel } from '../../../domain/models/User';
import { 
  CreateUserDto, 
  LoginUserDto, 
  UpdateUserDto, 
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UserResponseDto,
  AuthResponseDto 
} from '../../../domain/dto/UserDto';
import { JwtService } from './JwtService';
import crypto from 'crypto';

export class AuthService {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  async registerUser(userData: CreateUserDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Create new user
    const user = new User(
      userData.username,
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.role || 'user',
      userData.avatar,
      userData.bio,
      userData.socialLinks
    );

    // Hash password
    await user.hashPassword();

    // Save to database
    const userDoc = new UserModel(user.toJSON());
    const savedUser = await userDoc.save();

    // Generate JWT token
    const token = this.jwtService.generateToken(savedUser._id.toString());

    return {
      success: true,
      token,
      user: this.mapToUserResponse(savedUser),
    };
  }

  async loginUser(loginData: LoginUserDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await UserModel.findOne({ email: loginData.email }).select('+password');

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await user.matchPassword(loginData.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = this.jwtService.generateToken(user._id.toString());

    return {
      success: true,
      token,
      user: this.mapToUserResponse(user),
    };
  }

  async getCurrentUser(userId: string): Promise<UserResponseDto> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.mapToUserResponse(user);
  }

  async updateUserProfile(userId: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return this.mapToUserResponse(user);
  }

  async changePassword(userId: string, passwordData: ChangePasswordDto): Promise<void> {
    const user = await UserModel.findById(userId).select('+password');

    if (!user) {
      throw new Error('User not found');
    }

    // Check current password
    const isMatch = await user.matchPassword(passwordData.currentPassword);

    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = passwordData.newPassword;
    await user.save();
  }

  async forgotPassword(forgotData: ForgotPasswordDto): Promise<void> {
    const user = await UserModel.findOne({ email: forgotData.email });

    if (!user) {
      throw new Error('User not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = new Date(resetPasswordExpire);

    await user.save();

    // TODO: Send email with reset token
    // For now, just log the token (remove in production)
    console.log('Reset token:', resetToken);
  }

  async resetPassword(resetToken: string, resetData: ResetPasswordDto): Promise<void> {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    // Set new password
    user.password = resetData.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
  }

  async verifyToken(token: string): Promise<string> {
    return this.jwtService.verifyToken(token);
  }

  private mapToUserResponse(user: any): UserResponseDto {
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      socialLinks: user.socialLinks,
      isVerified: user.isVerified,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
} 