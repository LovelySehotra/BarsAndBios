import { Router} from "express";
import UserRouter from "./user.router";
import NewsRouter from "./news.router";

const appRouter = Router();
appRouter.use("/news",NewsRouter)
appRouter.use("/users",UserRouter);
export {appRouter};