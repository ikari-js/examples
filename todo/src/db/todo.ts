type BaseSchema = {
  id: number;
  created_at: Date;
  updated_at: Date;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
};

export class Store<T extends BaseSchema> {
  private items: T[] = [];

  create(data: T) {
    this.items.push(data);
    return data;
  }

  getAll() {
    return this.items;
  }

  getById(id: number) {
    return this.items.find((item) => item.id === id);
  }

  update(id: number, data: Partial<T>) {
    const item = this.getById(id);
    if (!item) {
      return null;
    }

    Object.assign(item, data);
    return item;
  }

  delete(id: number) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    return this.items.splice(index, 1)[0];
  }
}
