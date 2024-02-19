import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'http://localhost:3000/todos';
  private todos$: Observable<Todo[]>;
  private loadTodosTrigger$ = new BehaviorSubject(true);

  constructor(private http: HttpClient) {
    this.todos$ = this.loadTodosTrigger$.pipe(
      switchMap(() => {
        return this.http.get<Todo[]>(this.url);
      })
    );
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  loadTodos(): void {
    this.loadTodosTrigger$.next(true);
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.url, todo).pipe(
      catchError(this.handleError),
      tap(() => this.loadTodos())
    );
  }

  updateTodo(todo: Todo): Observable<any> {
    const updateUrl = `${this.url}/${todo.todoId}`;
    return this.http.put<Todo>(updateUrl, todo).pipe(
      catchError(this.handleError),
      tap(() => this.loadTodos())
    );
  }

  deleteTodo(todoId: string): Observable<any> {
    const deleteUrl = `${this.url}/${todoId}`;
    return this.http.delete<Todo>(deleteUrl).pipe(
      catchError(this.handleError),
      tap(() => this.loadTodos())
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status}: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
