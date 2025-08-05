import { Request, Response } from 'express';
import { AuthService } from '../../application/services/Auth/AuthService';
import { 
  CreateUserDto, 
  LoginUserDto, 
  UpdateUserDto, 
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto 
} from '../../domain/dto/UserDto';
import { Logger } from '../../config/logger';

export class UserController {
  private authService: AuthService;
  private logger: Logger;

  constructor() {
    this.authService = new AuthService();
    this.logger = Logger.getInstance();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const result = await this.authService.registerUser(userData);

      res.status(201).json(result);
    } catch (error) {
      this.logger.error('Registration error:', error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Server error during registration',
      });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const loginData: LoginUserDto = req.body;
      const result = await this.authService.loginUser(loginData);

      res.json(result);
    } catch (error) {
      this.logger.error('Login error:', error);
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Server error during login',
      });
    }
  };

  public getCurrentUser = async (req: any, res: Response): Promise<void> => {
    try {
      const user = await this.authService.getCurrentUser(req.user.id);

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      this.logger.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  };

  public updateProfile = async (req: any, res: Response): Promise<void> => {
    try {
      const updateData: UpdateUserDto = req.body;
      const user = await this.authService.updateUserProfile(req.user.id, updateData);

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      this.logger.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  };

  public changePassword = async (req: any, res: Response): Promise<void> => {
    try {
      const passwordData: ChangePasswordDto = req.body;
      await this.authService.changePassword(req.user.id, passwordData);

      res.json({
        success: true,
        message: 'Password updated successfully',
      });
    } catch (error) {
      this.logger.error('Change password error:', error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Server error',
      });
    }
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const forgotData: ForgotPasswordDto = req.body;
      await this.authService.forgotPassword(forgotData);

      res.json({
        success: true,
        message: 'Password reset email sent',
      });
    } catch (error) {
      this.logger.error('Forgot password error:', error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Server error',
      });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { resetToken } = req.params;
      const resetData: ResetPasswordDto = req.body;
      await this.authService.resetPassword(resetToken, resetData);

      res.json({
        success: true,
        message: 'Password reset successful',
      });
    } catch (error) {
      this.logger.error('Reset password error:', error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Server error',
      });
    }
  };
} 