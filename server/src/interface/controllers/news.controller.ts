import { Request, Response, NextFunction } from "express";
import { NewsService } from "@/application/services/news.service";

export class NewsController {
  private newsService: NewsService;

  constructor() {
    this.newsService = new NewsService();
  }

  createNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const news = await this.newsService.createNews(req.body);
      res.status(201).json(news);
    } catch (error) {
      next(error);
    }
  };

  getAllNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newsList = await this.newsService.getAllNews();
      res.json(newsList);
    } catch (error) {
      next(error);
    }
  };

  getNewsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const news = await this.newsService.getNewsById(req.params.id);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.json(news);
    } catch (error) {
      next(error);
    }
  };

  updateNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const news = await this.newsService.updateNews(req.params.id, req.body);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.json(news);
    } catch (error) {
      next(error);
    }
  };

  deleteNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const news = await this.newsService.deleteNews(req.params.id);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.json({ message: "News deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
