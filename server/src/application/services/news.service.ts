import { News, INews } from "@/domain/models/News";
import { AppError } from "@/interface/middleware";

export class NewsService {
  async createNews(data: Partial<INews>): Promise<INews> {
    const news = new News(data);
    const savedNews = await news.save();
    if(!savedNews){
      throw new AppError("Failed to create news", 500, "FAILED_TO_CREATE_NEWS");
    }
    return savedNews;
  }

  async getAllNews(): Promise<INews[]> {
    const newsList = await News.find().sort({ createdAt: -1 });
    if(!newsList){
      throw new AppError("Failed to get news", 500, "FAILED_TO_GET_NEWS");
    }
    return newsList;
  }

  async getNewsById(id: string): Promise<INews | null> {
    const news = await News.findById(id);
    if(!news){
      throw new AppError("Failed to get news", 500, "FAILED_TO_GET_NEWS");
    }
    return news;
  }

  async updateNews(id: string, data: Partial<INews>): Promise<INews | null> {
    const updatedNews = await News.findByIdAndUpdate(id, data, { new: true });
    if(!updatedNews){
      throw new AppError("Failed to update news", 500, "FAILED_TO_UPDATE_NEWS");
    }
    return updatedNews;
  }

  async deleteNews(id: string): Promise<INews | null> {
    const deletedNews = await News.findByIdAndDelete(id);
    if(!deletedNews){
      throw new AppError("Failed to delete news", 500, "FAILED_TO_DELETE_NEWS");
    }
    return deletedNews;
  }
}
