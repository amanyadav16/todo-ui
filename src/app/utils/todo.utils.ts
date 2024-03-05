import { Todo } from '../models/todo';

export class TodoUtility {
  findAndUpdate(todos: Todo[], updatedTodo: any) {
    let index = todos.findIndex(
      (todo: Todo) => todo.todoId == updatedTodo.todoId
    );

    let modifiedTodos = [...todos];
    if (index !== -1) {
      modifiedTodos[index] = { ...updatedTodo };
    }

    return modifiedTodos;
  }

  deleteKey(data: any, key: string) {
    let dataCopy = { ...data };
    delete dataCopy['todoId'];
    return dataCopy;
  }
}
