import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Todo } from '../../todo/todo.model';
import { TodoService } from '../../todo/todo.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobileMenuOpen = false;
  showNewTaskModal = false;
  newTaskName = '';
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();  // โหลด todos ตอนเริ่มต้น
  }

  // ฟังก์ชันดึง Todo ทั้งหมด
  async loadTodos(): Promise<void> {
    try {
      this.todos = await this.todoService.getTodos();
    } catch (error) {
      console.error('[loadTodos] Error:', error);
    }
  }

  // ฟังก์ชัน toggle สำหรับเปิด/ปิดเมนู
  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // ฟังก์ชันเปิด Modal สำหรับเพิ่ม Task ใหม่
  openNewTaskModal(): void {
    this.showNewTaskModal = true;
    this.newTaskName = ''; // รีเซ็ตค่าเมื่อเปิด modal
  }

  // ฟังก์ชันปิด Modal
  closeNewTaskModal(): void {
    this.showNewTaskModal = false;
  }

  // ฟังก์ชันเพิ่ม Task
  async addTask(): Promise<void> {
    if (!this.newTaskName.trim()) return;

    try {
      // เพิ่ม Task ใหม่ผ่าน TodoService
      const todo = await this.todoService.addTodo(this.newTaskName);
      this.todos.push(todo);
      this.newTaskName = '';
      this.closeNewTaskModal(); // ปิด modal หลังจากเพิ่ม task
      window.location.reload(); 
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเพิ่ม task:', error);
    }
  }
}
