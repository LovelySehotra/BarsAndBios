import { Router} from "express";
import UserRouter from "./user.router";
import NewsRouter from "./news.router";
import AlbumsRouter from "./albums.router";

const appRouter = Router();
appRouter.use("/news",NewsRouter)
appRouter.use("/users",UserRouter);
appRouter.use("/albums",AlbumsRouter);
export {appRouter};