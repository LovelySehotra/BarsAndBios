import mongoose, { Document, Schema } from 'mongoose';

export interface IArtist extends Document {
  name: string;
  realName?: string;
  stageName: string;
  bio: string;
  image: string;
  genre: string[];
  hometown: string;
  activeYears: {
    start: number;
    end?: number;
  };
  labels: string[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
    website?: string;
  };
  discography: mongoose.Types.ObjectId[];
  featured: boolean;
  verified: boolean;
  followers: number;
  monthlyListeners: number;
  createdAt: Date;
  updatedAt: Date;
}

const artistSchema = new Schema<IArtist>({
  name: {
    type: String,
    required: [true, 'Please add artist name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  realName: {
    type: String,
    trim: true,
    maxlength: [100, 'Real name cannot be more than 100 characters'],
  },
  stageName: {
    type: String,
    required: [true, 'Please add stage name'],
    trim: true,
    maxlength: [100, 'Stage name cannot be more than 100 characters'],
  },
  bio: {
    type: String,
    required: [true, 'Please add artist bio'],
    maxlength: [2000, 'Bio cannot be more than 2000 characters'],
  },
  image: {
    type: String,
    required: [true, 'Please add artist image'],
  },
  genre: [{
    type: String,
    required: [true, 'Please add at least one genre'],
    enum: [
      'Hip-Hop',
      'Trap',
      'Conscious Rap',
      'Alternative Hip-Hop',
      'Gangsta Rap',
      'Boom Bap',
      'Drill',
      'Mumble Rap',
      'Experimental Hip-Hop',
      'Jazz Rap',
      'Political Hip-Hop',
      'Pop Rap',
      'R&B',
      'Soul',
      'Funk',
      'Reggae',
      'Afrobeat',
      'Grime',
      'UK Drill',
      'Other'
    ],
  }],
  hometown: {
    type: String,
    required: [true, 'Please add hometown'],
    trim: true,
  },
  activeYears: {
    start: {
      type: Number,
      required: [true, 'Please add start year'],
      min: [1900, 'Start year must be after 1900'],
      max: [new Date().getFullYear(), 'Start year cannot be in the future'],
    },
    end: {
      type: Number,
      min: [1900, 'End year must be after 1900'],
      max: [new Date().getFullYear(), 'End year cannot be in the future'],
    },
  },
  labels: [{
    type: String,
    trim: true,
  }],
  socialMedia: {
    instagram: String,
    twitter: String,
    youtube: String,
    spotify: String,
    website: String,
  },
  discography: [{
    type: Schema.Types.ObjectId,
    ref: 'Album',
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  followers: {
    type: Number,
    default: 0,
    min: [0, 'Followers cannot be negative'],
  },
  monthlyListeners: {
    type: Number,
    default: 0,
    min: [0, 'Monthly listeners cannot be negative'],
  },
}, {
  timestamps: true,
});

// Create index for search
artistSchema.index({ name: 'text', stageName: 'text', bio: 'text' });

export const Artist = mongoose.model<IArtist>('Artist', artistSchema); 