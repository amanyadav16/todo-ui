import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]> | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos$ = this.todoService.getTodos();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }
}
