import { Context, Serve } from "ikari";
import { Before, Controller, Get } from "ikari/decorators";

function logger(ctx: Context) {
  const startTime = Date.now();
  ctx.next();
  const endTime = Date.now();
  console.log(
    `${ctx.method} ${ctx.url} ${ctx.getStatus()} - ${endTime - startTime}ms`
  );
}

function auth(ctx: Context) {
  if (ctx.authorization() !== "Bearer token") {
    return ctx.status(401).json({ message: "Unauthorized" });
  }
  return ctx.next();
}

function validate(ctx: Context) {
  if (!ctx.query("name")) {
    return ctx.status(400).json({ message: "Name is required" });
  }
  return ctx.next();
}

@Controller("/")
class TestController {
  @Get("/")
  @Before(validate)
  index(ctx: Context) {
    return ctx.json({ message: `Hello ${ctx.query("name")}` });
  }
}

const server = Serve({
  controllers: [TestController],
  middlewares: [logger, auth],
});

process.on("SIGINT", () => {
  console.log("Server is shutting down");
  server.stop();
});
