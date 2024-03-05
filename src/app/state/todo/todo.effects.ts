import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadTodos,
  loadTodosSuccess,
  addTodo,
  removeTodo,
  addTodoSuccess,
  removeTodoSuccess,
  updateTodo,
  updateTodoSuccess,
  handleTodoFailure,
} from './todo.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { TodoService } from '../../todo.service';

@Injectable()
export class TodoEffects {
  store: any;
  constructor(private actions$: Actions, private todoService: TodoService) {}

  /* ------------------ Load todo effect ------------------ */
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => loadTodosSuccess({ todos: todos })),
          catchError((error) => of(handleTodoFailure({ error: error.message })))
        )
      )
    )
  );

  /* ------------------- Add todo effect ------------------ */
  addTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap(({ content }) =>
        this.todoService.addTodo(content).pipe(
          map((todo) => addTodoSuccess({ todo })),
          catchError((error) => of(handleTodoFailure({ error: error.message })))
        )
      )
    )
  );

  /* ----------------- Update todo effect ----------------- */
  updateTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap(({ updatedFields }) =>
        this.todoService.updateTodo(updatedFields).pipe(
          map((todo) => updateTodoSuccess({ todo })),
          catchError((error) => of(handleTodoFailure({ error: error.message })))
        )
      )
    )
  );

  /* ----------------- Delete todo effect ----------------- */
  removeTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      switchMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map(() => removeTodoSuccess({ id })),
          catchError((error) => of(handleTodoFailure({ error: error.message })))
        )
      )
    )
  );
}
