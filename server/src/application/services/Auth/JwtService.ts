import jwt from 'jsonwebtoken';

export class JwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'fallback-secret';
    this.expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  }

  generateToken(userId: string): string {
    return jwt.sign({ id: userId }, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token: string): string {
    try {
      const decoded = jwt.verify(token, this.secret) as any;
      return decoded.id;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  decodeToken(token: string): any {
    try {
      return jwt.decode(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as any;
      if (!decoded || !decoded.exp) {
        return true;
      }
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      return true;
    }
  }
} 