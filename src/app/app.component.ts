import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { selectAllTodos } from './state/todo/todo.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todos$: Observable<Todo[]> | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.todos$ = this.store.select(selectAllTodos);
  }
}
