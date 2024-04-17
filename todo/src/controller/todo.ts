import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from "ikari/decorators";
import TodoService from "../service/todo";
import { Context } from "ikari";

@Controller("/")
class TodoController {
  // Also can use @Inject() decorator to inject the service. See src/service/todo.ts for example.
  constructor(private todoService: TodoService) {}

  @Post("/")
  async create(ctx: Context) {
    const body = (await ctx.body()) as { title: string; description: string };
    if (!body) {
      return ctx.status(400).json({ message: "Invalid request" });
    }

    if (!body.title) {
      return ctx.status(400).json({ message: "Title is required" });
    }

    if (!body.description) {
      return ctx.status(400).json({ message: "Description is required" });
    }

    return ctx.json(this.todoService.create(body.title, body.description));
  }

  @Get("/")
  async index(ctx: Context) {
    return ctx.json(this.todoService.getAll());
  }

  @Get("/:id")
  async getById(ctx: Context) {
    return ctx.json(this.todoService.getById(Number(ctx.params.id)))
  }

  @Get("/completed")
  async getCompleted(ctx: Context) {
    return ctx.json(this.todoService.getCompleted());
  }

  @Put("/:id/toggle")
  async toggle(ctx: Context) {
    return ctx.json(this.todoService.toggle(Number(ctx.params.id)));
  }

  @Delete("/:id")
  async delete(ctx: Context) {
    return ctx.json(this.todoService.delete(Number(ctx.params.id)));
  }

  @Patch("/:id/description")
  async updateDescription(ctx: Context) {
    const body = (await ctx.body()) as { description: string };
    if (!body) {
      return ctx.status(400).json({ message: "Invalid request" });
    }

    if (!body.description) {
      return ctx.status(400).json({ message: "Description is required" });
    }

    return ctx.json(this.todoService.update(Number(ctx.params.id), body.description));
  }
}

export default TodoController;
