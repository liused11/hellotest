import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo/todo.service';
import { NgIf, NgFor } from '@angular/common';
import { Todo } from '../../todo/todo.model';

@Component({
  selector: 'app-todo-completed',
  standalone: true,
  imports: [ NgIf, NgFor ],
  templateUrl: './todo-completed.component.html',
  styleUrls: ['./todo-completed.component.css'],
})
export class TodoCompletedComponent implements OnInit {
  completedTodos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadCompletedTodos();
  }

  async loadCompletedTodos(): Promise<void> {
    try {
      this.completedTodos = await this.todoService.getCompletedTodos();
    } catch (error) {
      console.error('Error loading completed todos:', error);
    }
  }
}
