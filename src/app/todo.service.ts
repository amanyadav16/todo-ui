import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo';
import { TodoUtility } from './utils/todo.utils';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient, private todoUtility: TodoUtility) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  addTodo(task: string): Observable<any> {
    return this.http.post<Todo>(this.url, { task });
  }

  updateTodo(updatedFields: any): Observable<any> {
    return this.http.patch<Todo>(
      `${this.url}/${updatedFields.todoId}`,
      this.todoUtility.deleteKey(updatedFields, 'todoId')
    );
  }

  deleteTodo(todoId: string): Observable<any> {
    return this.http.delete<Todo>(`${this.url}/${todoId}`);
  }
}
