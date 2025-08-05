import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  album: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  highlights: string[];
  lowlights: string[];
  featured: boolean;
  verified: boolean;
  likes: number;
  dislikes: number;
  comments: mongoose.Types.ObjectId[];
  tags: string[];
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'Please add album'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add author'],
  },
  rating: {
    type: Number,
    required: [true, 'Please add rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  title: {
    type: String,
    required: [true, 'Please add review title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please add review content'],
    minlength: [100, 'Review must be at least 100 characters'],
    maxlength: [5000, 'Review cannot be more than 5000 characters'],
  },
  pros: [{
    type: String,
    trim: true,
    maxlength: [200, 'Pro cannot be more than 200 characters'],
  }],
  cons: [{
    type: String,
    trim: true,
    maxlength: [200, 'Con cannot be more than 200 characters'],
  }],
  highlights: [{
    type: String,
    trim: true,
    maxlength: [200, 'Highlight cannot be more than 200 characters'],
  }],
  lowlights: [{
    type: String,
    trim: true,
    maxlength: [200, 'Lowlight cannot be more than 200 characters'],
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative'],
  },
  dislikes: {
    type: Number,
    default: 0,
    min: [0, 'Dislikes cannot be negative'],
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  tags: [{
    type: String,
    trim: true,
  }],
  readTime: {
    type: Number,
    default: 0,
    min: [0, 'Read time cannot be negative'],
  },
}, {
  timestamps: true,
});

// Create index for search
reviewSchema.index({ title: 'text', content: 'text' });

// Calculate read time before saving
reviewSchema.pre('save', function(next) {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(' ').length;
  this.readTime = Math.ceil(wordCount / wordsPerMinute);
  next();
});

// Update album average rating when review is saved
reviewSchema.post('save', async function() {
  const Album = mongoose.model('Album');
  const album = await Album.findById(this.album);
  if (album) {
    await album.calculateAverageRating();
  }
});

// Update album average rating when review is deleted
reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const Album = mongoose.model('Album');
    const album = await Album.findById(doc.album);
    if (album) {
      await album.calculateAverageRating();
    }
  }
});

export const Review = mongoose.model<IReview>('Review', reviewSchema); 