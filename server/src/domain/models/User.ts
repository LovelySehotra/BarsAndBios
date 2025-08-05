import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'reviewer' | 'admin';
  avatar?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

export class User {
  private _id?: string;
  private _username: string;
  private _email: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private _role: 'user' | 'reviewer' | 'admin';
  private _avatar?: string;
  private _bio?: string;
  private _socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  private _isVerified: boolean;
  private _verificationToken?: string;
  private _resetPasswordToken?: string;
  private _resetPasswordExpire?: Date;
  private _lastLogin?: Date;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: 'user' | 'reviewer' | 'admin' = 'user',
    avatar?: string,
    bio?: string,
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      website?: string;
    }
  ) {
    this._username = username;
    this._email = email;
    this._password = password;
    this._firstName = firstName;
    this._lastName = lastName;
    this._role = role;
    this._avatar = avatar;
    this._bio = bio;
    this._socialLinks = socialLinks;
    this._isVerified = false;
  }

  // Getters
  get id(): string | undefined { return this._id; }
  get username(): string { return this._username; }
  get email(): string { return this._email; }
  get password(): string { return this._password; }
  get firstName(): string { return this._firstName; }
  get lastName(): string { return this._lastName; }
  get role(): 'user' | 'reviewer' | 'admin' { return this._role; }
  get avatar(): string | undefined { return this._avatar; }
  get bio(): string | undefined { return this._bio; }
  get socialLinks(): any { return this._socialLinks; }
  get isVerified(): boolean { return this._isVerified; }
  get verificationToken(): string | undefined { return this._verificationToken; }
  get resetPasswordToken(): string | undefined { return this._resetPasswordToken; }
  get resetPasswordExpire(): Date | undefined { return this._resetPasswordExpire; }
  get lastLogin(): Date | undefined { return this._lastLogin; }
  get createdAt(): Date | undefined { return this._createdAt; }
  get updatedAt(): Date | undefined { return this._updatedAt; }

  // Setters
  set id(value: string | undefined) { this._id = value; }
  set username(value: string) { this._username = value; }
  set email(value: string) { this._email = value; }
  set password(value: string) { this._password = value; }
  set firstName(value: string) { this._firstName = value; }
  set lastName(value: string) { this._lastName = value; }
  set role(value: 'user' | 'reviewer' | 'admin') { this._role = value; }
  set avatar(value: string | undefined) { this._avatar = value; }
  set bio(value: string | undefined) { this._bio = value; }
  set socialLinks(value: any) { this._socialLinks = value; }
  set isVerified(value: boolean) { this._isVerified = value; }
  set verificationToken(value: string | undefined) { this._verificationToken = value; }
  set resetPasswordToken(value: string | undefined) { this._resetPasswordToken = value; }
  set resetPasswordExpire(value: Date | undefined) { this._resetPasswordExpire = value; }
  set lastLogin(value: Date | undefined) { this._lastLogin = value; }
  set createdAt(value: Date | undefined) { this._createdAt = value; }
  set updatedAt(value: Date | undefined) { this._updatedAt = value; }

  // Methods
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this._password = await bcrypt.hash(this._password, salt);
  }

  async matchPassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this._password);
  }

  getSignedJwtToken(): string {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  toJSON(): any {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      firstName: this._firstName,
      lastName: this._lastName,
      role: this._role,
      avatar: this._avatar,
      bio: this._bio,
      socialLinks: this._socialLinks,
      isVerified: this._isVerified,
      lastLogin: this._lastLogin,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  toPublicJSON(): any {
    return {
      id: this._id,
      username: this._username,
      firstName: this._firstName,
      lastName: this._lastName,
      role: this._role,
      avatar: this._avatar,
      bio: this._bio,
      socialLinks: this._socialLinks,
      lastLogin: this._lastLogin,
      createdAt: this._createdAt,
    };
  }
}

// Mongoose Schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true,
    maxlength: [50, 'Username cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters'],
  },
  role: {
    type: String,
    enum: ['user', 'reviewer', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters'],
  },
  socialLinks: {
    twitter: String,
    instagram: String,
    website: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
}, {
  timestamps: true,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const UserModel = mongoose.model<IUser>('User', userSchema); 