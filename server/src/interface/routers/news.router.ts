import { Router } from "express";
import { NewsController } from "@/interface/controllers/news.controller";
import { UseRequestDto, UseResponseDto } from "../middleware";
import { CreateNewsDto, NewsResponseDto, UpdateNewsDto } from "@/application/dtos/news/news.dtos";

const router = Router();
const newsController = new NewsController();

router.post("/", UseRequestDto(CreateNewsDto), UseResponseDto(NewsResponseDto), newsController.createNews);
router.get("/", UseResponseDto(NewsResponseDto), newsController.getAllNews);
router.get("/:id", UseResponseDto(NewsResponseDto), newsController.getNewsById);
router.put("/:id", UseRequestDto(UpdateNewsDto), UseResponseDto(NewsResponseDto), newsController.updateNews);
router.delete("/:id", UseResponseDto(NewsResponseDto), newsController.deleteNews);

export default router;
