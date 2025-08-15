import { apiClient } from '@/lib/services/api';

// Types for News API
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image?: string;
  date: string;
  readTime: string;
  tags?: string[];
}

export interface CreateNewsDto {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image?: string;
  tags?: string[];
}

export interface UpdateNewsDto extends Partial<CreateNewsDto> {}

// News API Service
export class NewsService {
  // GET /news - Get all news articles
  static async getAllNews(): Promise<NewsArticle[]> {
    return apiClient.get<NewsArticle[]>('/news');
  }

  // GET /news/:id - Get news article by ID
  static async getNewsById(id: string): Promise<NewsArticle> {
    return apiClient.get<NewsArticle>(`/news/${id}`);
  }

  // POST /news - Create new news article
  static async createNews(data: CreateNewsDto): Promise<NewsArticle> {
    return apiClient.post<NewsArticle>('/news', data);
  }

  // PUT /news/:id - Update news article
  static async updateNews(id: string, data: UpdateNewsDto): Promise<NewsArticle> {
    return apiClient.put<NewsArticle>(`/news/${id}`, data);
  }

  // DELETE /news/:id - Delete news article
  static async deleteNews(id: string): Promise<void> {
    return apiClient.delete<void>(`/news/${id}`);
  }

  // Additional utility methods
  static async getNewsByCategory(category: string): Promise<NewsArticle[]> {
    return apiClient.get<NewsArticle[]>(`/news?category=${category}`);
  }

  static async searchNews(query: string): Promise<NewsArticle[]> {
    return apiClient.get<NewsArticle[]>(`/news?search=${query}`);
  }
}