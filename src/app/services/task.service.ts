import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { CustomTaskType } from '../models/task-type.model';
import { DEFAULT_TASK_TYPES, STORAGE_KEY } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  async getTasks(): Promise<Task[]> {
    await this.loadTasks();
    return this.tasks;
  }

  async addTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: Date.now()
    };
    this.tasks.push(newTask);
    await this.saveTasks();
    this.tasksSubject.next([...this.tasks]);
    return newTask;
  }

  async updateTask(updatedTask: Task): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      await this.saveTasks();
      this.tasksSubject.next([...this.tasks]);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    await this.saveTasks();
    this.tasksSubject.next([...this.tasks]);
  }

  getTaskTypes(): CustomTaskType[] {
    return DEFAULT_TASK_TYPES;
  }

  private async loadTasks(): Promise<void> {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    if (value) {
      this.tasks = JSON.parse(value);
    }
    this.tasksSubject.next([...this.tasks]);
  }

  private async saveTasks(): Promise<void> {
    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(this.tasks)
    });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}