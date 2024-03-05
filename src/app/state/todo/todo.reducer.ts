import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../models/todo';
import {
  addTodo,
  addTodoSuccess,
  handleTodoFailure,
  loadTodos,
  loadTodosSuccess,
  removeTodo,
  removeTodoSuccess,
  updateTodo,
  updateTodoSuccess,
} from './todo.actions';
import { TodoUtility } from '../../utils/todo.utils';

export interface TodoState {
  todos: Todo[];
  error: string | null;
  status:
    | 'pending'
    | 'loading'
    | 'error'
    | 'success'
    | 'adding'
    | 'deleting'
    | 'updating';
}

export const initialState: TodoState = {
  todos: [],
  error: null,
  status: 'pending',
};

export const todoReducer = createReducer(
  initialState,

  /* -------------- Load todos reducers------------- */
  on(
    loadTodos,
    (state) =>
      ({
        ...state,
        status: 'loading',
      } as TodoState)
  ),

  on(
    loadTodosSuccess,
    (state, { todos }) =>
      ({
        ...state,
        todos: todos,
        error: null,
        status: 'success',
      } as TodoState)
  ),

  /* -------------- Add todo reducers -------------- */
  on(
    addTodo,
    (state) =>
      ({
        ...state,
        status: 'adding',
      } as TodoState)
  ),

  on(
    addTodoSuccess,
    (state, { todo }) =>
      ({
        ...state,
        todos: [...state.todos, todo],
        status: 'success',
      } as TodoState)
  ),

  /* ------------- Delete todo reducers ------------ */
  on(
    removeTodo,
    (state) =>
      ({
        ...state,
        status: 'deleting',
      } as TodoState)
  ),

  on(
    removeTodoSuccess,
    (state, { id }) =>
      ({
        ...state,
        todos: state.todos.filter((todo) => todo.todoId !== id),
        status: 'success',
      } as TodoState)
  ),

  /* ------------- Delete todo reducers ------------ */
  on(
    updateTodo,
    (state) =>
      ({
        ...state,
        status: 'updating',
      } as TodoState)
  ),

  on(updateTodoSuccess, (state, { todo }) => {
    let todoUtility = new TodoUtility();
    return {
      ...state,
      todos: [...todoUtility.findAndUpdate(state.todos, todo)],
      status: 'success',
    } as TodoState;
  }),

  /* ------------ handle todo failure reducer ------------ */
  on(
    handleTodoFailure,
    (state, { error }) =>
      ({
        ...state,
        error: error,
        status: 'error',
      } as TodoState)
  )
);
