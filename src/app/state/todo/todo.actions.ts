import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo';

/* ---------------------- Load todos actions ---------------------- */
export const loadTodos = createAction('[Todo Page] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo API] Todo Load Success',
  props<{ todos: Todo[] }>()
);

/* ---------------------- Add todo actions ---------------------- */
export const addTodo = createAction(
  '[Todo Page] Add Todo',
  props<{ content: string }>()
);

export const addTodoSuccess = createAction(
  '[Todo Page] Add Todo Success',
  props<{ todo: Todo }>()
);

/* --------------------- Update todo actions -------------------- */
export const updateTodo = createAction(
  '[Todo Page] Update Todo',
  props<{ updatedFields: any }>()
);

export const updateTodoSuccess = createAction(
  '[Todo Page] Update Todo Success',
  props<{ todo: Todo }>()
);

/* --------------------- Delete todo actions -------------------- */
export const removeTodo = createAction(
  '[Todo Page] Remove Todo',
  props<{ id: string }>()
);

export const removeTodoSuccess = createAction(
  '[Todo Page] Remove Todo Success',
  props<{ id: string }>()
);

/* ------------ Failure handling actions ----------- */
export const handleTodoFailure = createAction(
  '[Todo Page] Failure In Todo Operation',
  props<{ error: string }>()
);
