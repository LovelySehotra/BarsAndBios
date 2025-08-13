import express, { Application } from "express";
import cors from "cors";
import { connectionToDB } from "@/infrastructure";
import { appRouter } from "@/interface/routers";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET,FRONTENT } from "./env.config";
import axios from "axios";

export type AppConfig = {
  port?: number | string;
};

export class Server {
  private app;
  private config: AppConfig;
  constructor(config: AppConfig) {
    this.config = config;
    this.app = express();
    
    // Enable CORS
    this.app.use(cors({
      origin: FRONTENT || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }));
    
    // Parse JSON bodies
    this.app.use(express.json());
    
    // API routes
    this.app.use("/api", appRouter);
  }

  start() {
    const port = this.config.port ?? 1209;
    connectionToDB();
    this.app.listen(port, () => {
      console.log("Yes i am working");
    });
  }
}
