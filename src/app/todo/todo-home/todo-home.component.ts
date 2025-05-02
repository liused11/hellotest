import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../todo/todo.model';  // นำเข้า Todo model หากยังไม่ได้
import { TodoService } from '../../todo/todo.service';
@Component({
  selector: 'app-todo-home',
  standalone: true,
  imports: [ NgIf, NgFor, FormsModule],
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.css'],
})
export class TodoHomeComponent implements OnInit, AfterViewInit {
  todos: Todo[] = [];
  editingTodoId: number | null = null;
  newTask: string = '';

  @ViewChild('editInput') editInput?: ElementRef;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  ngAfterViewInit(): void {
    this.focusEditInput();
  }

  // ดึงรายการ Todo ทั้งหมด
  async loadTodos(): Promise<void> {
    try {
      this.todos = await this.todoService.getTodos();
    } catch (error) {
      console.error('[loadTodos] Error:', error);
    }
  }

  // ฟังก์ชัน toggle สำหรับ mark เป็น completed
  async toggleComplete(todo: Todo): Promise<void> {
    const updatedTodo = { ...todo, completed: !todo.completed };
    try {
      console.log("Updating todo:", updatedTodo); // ตรวจสอบข้อมูลที่ส่งไป
      await this.todoService.updateTodo(updatedTodo);
      todo.completed = !todo.completed;
    } catch (error) {
      console.error('Error toggling completion', error);
    }
  }

  // ลบ Todo
  async deleteTodo(id: number): Promise<void> {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      await this.todoService.deleteTodo(id);
      this.todos = this.todos.filter((t) => t.id !== id);
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  }

  // แก้ไข Todo
  editTodo(id: number): void {
    this.editingTodoId = id;
    setTimeout(() => this.focusEditInput());
  }

  // อัปเดต Task
  async updateTask(id: number, newTask: string): Promise<void> {
    if (!newTask.trim()) {
      this.editingTodoId = null;
      return;
    }

    const todo = this.todos.find((t) => t.id === id);
    if (todo && todo.task !== newTask) {
      const updated = { ...todo, task: newTask };
      try {
        await this.todoService.updateTodo(updated);
        todo.task = newTask;
      } catch (error) {
        console.error('Error updating task', error);
      }
    }
    this.editingTodoId = null;
  }

  // focus ที่ input เพื่อแก้ไข
  private focusEditInput(): void {
    if (this.editInput) {
      this.editInput.nativeElement.focus();
    }
  }
}
