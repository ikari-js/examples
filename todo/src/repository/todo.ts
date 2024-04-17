import { Service } from "ikari/decorators";
import { type Todo, Store } from "../db/todo";

@Service({ eager: true })
class TodoRepository {
  private todo = new Store<Todo>();

  getAll() {
    return this.todo.getAll();
  }

  getById(id: number) {
    return this.todo.getById(id);
  }

  create(data: Todo) {
    data.completed = false;
    data.created_at = new Date();
    data.updated_at = new Date();
    data.id = this.todo.getAll().length + 1;

    return this.todo.create(data);
  }

  update(id: number, data: Todo) {
    return this.todo.update(id, data);
  }

  delete(id: number) {
    return this.todo.delete(id);
  }
}

export default TodoRepository;
