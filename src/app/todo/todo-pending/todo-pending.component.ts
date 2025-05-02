import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo copy/todo.service';
import { NgIf, NgFor } from '@angular/common';
import { Todo } from '../../todo copy/todo.model';

@Component({
  selector: 'app-todo-pending',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './todo-pending.component.html',
  styleUrls: ['./todo-pending.component.css']
})
export class TodoPendingComponent implements OnInit {
  pendingTodos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadPendingTodos();
  }

  async loadPendingTodos(): Promise<void> {
    try {
      this.pendingTodos = await this.todoService.getIncompleteTodos();
    } catch (error) {
      console.error('Error loading pending todos:', error);
    }
  }
}
