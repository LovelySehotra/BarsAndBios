import "reflect-metadata";
import "express-async-errors";

import { Server ,PORT}  from "@/config";
const server = new Server({
    port : PORT
})
server.start()