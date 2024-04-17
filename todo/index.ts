import  { Serve } from "ikari";
import  TodoController from "./src/controller/todo";

const server = Serve({
  prefix: "/api",
  controllers: [TodoController],
  middlewares: [],
});

process.on("SIGINT", () => {
  console.log("Stopping server...");
  server.stop();
});

