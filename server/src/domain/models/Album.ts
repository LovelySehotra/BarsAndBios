import mongoose, { Document, Schema } from 'mongoose';

export interface IAlbum extends Document {
  title: string;
  artist: mongoose.Types.ObjectId;
  type: 'album' | 'mixtape' | 'EP' | 'single';
  releaseDate: Date;
  genre: string[];
  coverArt: string;
  description: string;
  tracklist: {
    title: string;
    duration: number;
    features?: string[];
  }[];
  totalDuration: number;
  label: string;
  producer: string[];
  featured: boolean;
  verified: boolean;
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    soundcloud?: string;
    bandcamp?: string;
  };
  sales: {
    firstWeek: number;
    total: number;
    certification?: string;
  };
  reviews: mongoose.Types.ObjectId[];
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const albumSchema = new Schema<IAlbum>({
  title: {
    type: String,
    required: [true, 'Please add album title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'Please add artist'],
  },
  type: {
    type: String,
    required: [true, 'Please add album type'],
    enum: ['album', 'mixtape', 'EP', 'single'],
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please add release date'],
  },
  genre: [{
    type: String,
    required: [true, 'Please add at least one genre'],
    enum: [
      'Hip-Hop',
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
  coverArt: {
    type: String,
    required: [true, 'Please add cover art'],
  },
  description: {
    type: String,
    required: [true, 'Please add album description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters'],
  },
  tracklist: [{
    title: {
      type: String,
      required: [true, 'Please add track title'],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Please add track duration'],
      min: [0, 'Duration cannot be negative'],
    },
    features: [{
      type: String,
      trim: true,
    }],
  }],
  totalDuration: {
    type: Number,
    required: [true, 'Please add total duration'],
    min: [0, 'Total duration cannot be negative'],
  },
  label: {
    type: String,
    required: [true, 'Please add record label'],
    trim: true,
  },
  producer: [{
    type: String,
    trim: true,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  streamingLinks: {
    spotify: String,
    appleMusic: String,
    youtube: String,
    soundcloud: String,
    bandcamp: String,
  },
  sales: {
    firstWeek: {
      type: Number,
      default: 0,
      min: [0, 'First week sales cannot be negative'],
    },
    total: {
      type: Number,
      default: 0,
      min: [0, 'Total sales cannot be negative'],
    },
    certification: {
      type: String,
      enum: ['Gold', 'Platinum', 'Diamond', 'Multi-Platinum'],
    },
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Average rating cannot be negative'],
    max: [5, 'Average rating cannot exceed 5'],
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: [0, 'Total reviews cannot be negative'],
  },
}, {
  timestamps: true,
});

// Create index for search
albumSchema.index({ title: 'text', description: 'text' });

// Calculate average rating when reviews are added/updated
albumSchema.methods.calculateAverageRating = async function(): Promise<void> {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { album: this._id } },
    {
      $group: {
        _id: '$album',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    this.averageRating = Math.round(stats[0].averageRating * 10) / 10;
    this.totalReviews = stats[0].totalReviews;
  } else {
    this.averageRating = 0;
    this.totalReviews = 0;
  }

  await this.save();
};

export const Album = mongoose.model<IAlbum>('Album', albumSchema); 