import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { Store } from '@ngrx/store';
import {
  addTodo,
  loadTodos,
  removeTodo,
  updateTodo,
} from '../state/todo/todo.actions';
import { selectAllTodos } from '../state/todo/todo.selectors';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.todos$ = this.store.select(selectAllTodos);
    this.store.dispatch(loadTodos());
  }

  addTodo(task: string) {
    this.store.dispatch(addTodo({ content: task }));
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(
      updateTodo({
        updatedFields: {
          todoId: todo.todoId,
          isCompleted: !todo.isCompleted,
        },
      })
    );
  }

  deleteTodo(todoId: any) {
    this.store.dispatch(removeTodo({ id: todoId }));
  }
}
