import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: mongoose.Types.ObjectId;
  category: string;
  tags: string[];
  featuredImage: string;
  images: string[];
  featured: boolean;
  published: boolean;
  publishDate: Date;
  readTime: number;
  views: number;
  likes: number;
  shares: number;
  comments: mongoose.Types.ObjectId[];
  relatedArticles: mongoose.Types.ObjectId[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>({
  title: {
    type: String,
    required: [true, 'Please add article title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please add article slug'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please add article excerpt'],
    maxlength: [300, 'Excerpt cannot be more than 300 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please add article content'],
    minlength: [100, 'Content must be at least 100 characters'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add author'],
  },
  category: {
    type: String,
    required: [true, 'Please add category'],
    enum: [
      'Breaking News',
      'Album Releases',
      'Artist Interviews',
      'Industry News',
      'Culture',
      'Awards',
      'Events',
      'Technology',
      'Politics',
      'Social Issues',
      'Fashion',
      'Sports',
      'Other'
    ],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  featuredImage: {
    type: String,
    required: [true, 'Please add featured image'],
  },
  images: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  readTime: {
    type: Number,
    default: 0,
    min: [0, 'Read time cannot be negative'],
  },
  views: {
    type: Number,
    default: 0,
    min: [0, 'Views cannot be negative'],
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative'],
  },
  shares: {
    type: Number,
    default: 0,
    min: [0, 'Shares cannot be negative'],
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  relatedArticles: [{
    type: Schema.Types.ObjectId,
    ref: 'News',
  }],
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot be more than 60 characters'],
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot be more than 160 characters'],
    },
    keywords: [{
      type: String,
      trim: true,
    }],
  },
}, {
  timestamps: true,
});

// Create index for search
newsSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

// Generate slug from title if not provided
newsSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Calculate read time
  const wordsPerMinute = 200;
  const wordCount = this.content.split(' ').length;
  this.readTime = Math.ceil(wordCount / wordsPerMinute);
  
  next();
});

export const News = mongoose.model<INews>('News', newsSchema); 