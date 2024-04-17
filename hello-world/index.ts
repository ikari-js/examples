import { Serve, type Context } from "ikari";
import { Controller, Get } from "ikari/decorators";

@Controller("/")
class HelloWorldController {
  @Get("/")
  index(ctx: Context) {
    return ctx.json({ message: "Hello World!" });
  }
}

const server = Serve({
  controllers: [HelloWorldController],
});

process.on("SIGINT", () => {
  console.log("Bye bye!");
  server.stop();
});
