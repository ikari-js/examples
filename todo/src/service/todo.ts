import type { Todo } from "../db/todo";
import TodoRepository from "../repository/todo";
import { Inject, Service } from "ikari/decorators";

@Service({ transient: true })
class TodoService {
  constructor(@Inject() private todoRepository: TodoRepository) {}

  getAll() {
    return this.todoRepository.getAll();
  }

  getById(id: number) {
    return this.todoRepository.getById(id);
  }

  create(title: string, description: string) {
    return this.todoRepository.create({ title, description } as Todo);
  }

  update(id: number, description: string) {
    return this.todoRepository.update(id, { description } as Todo);
  }

  delete(id: number) {
    return this.todoRepository.delete(id);
  }

  toggle(id: number) {
    const todo = this.todoRepository.getById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return this.todoRepository.update(id, { completed: !todo.completed } as Todo);
  }

  getCompleted() {
    return this.todoRepository.getAll().filter((todo) => todo.completed);
  }
}

export default TodoService;
