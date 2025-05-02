import { Injectable } from '@angular/core';
import { supabase } from './supabase.client' // ต้องสร้างไฟล์นี้แยกไว้
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private table = 'todos';

  // ดึงรายการ Todo ทั้งหมด
  async getTodos(): Promise<Todo[]> {
    const { data, error } = await supabase.from(this.table).select('*');
    if (error) throw error;
    return data as Todo[];
  }

  // ดึง Todo ตาม ID
  async getTodoById(id: number): Promise<Todo | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  // เพิ่ม Todo ใหม่
  async addTodo(task: string): Promise<Todo> {
    const newTodo = { task, completed: false };
    const { data, error } = await supabase
      .from(this.table)
      .insert([newTodo])
      .select()
      .single();
    if (error) throw error;
    return data as Todo;
  }

  // อัปเดต Todo
  async updateTodo(todo: Todo): Promise<Todo> {
    const { data, error } = await supabase
      .from(this.table)
      .update({ task: todo.task, completed: todo.completed })
      .eq('id', todo.id)
      .select()
      .single();
    if (error) throw error;
    return data as Todo;
  }

  // ลบ Todo
  async deleteTodo(id: number): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }

  // ดึง Todo ที่ทำเสร็จแล้ว
  async getCompletedTodos(): Promise<Todo[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('completed', true);
    if (error) throw error;
    return data as Todo[];
  }

  // ดึง Todo ที่ยังไม่เสร็จ
  async getIncompleteTodos(): Promise<Todo[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('completed', false);
    if (error) throw error;
    return data as Todo[];
  }
}
