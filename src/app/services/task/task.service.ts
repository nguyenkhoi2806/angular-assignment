import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Task } from 'app/types/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasks';

  constructor() {}

  private getTasksFromLocalStorage(): Task[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getTasks(): Observable<Task[]> {
    const tasks = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return of(tasks);
  }

  getTask(id: number): Observable<Task | undefined> {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    const task = tasks.find((task) => task.id === id);
    return of(task);
  }

  addTask(task: Task): Observable<Task> {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    task.id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    return of(task);
  }

  updateTask(task: Task): Observable<any> {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
      return of(task);
    }
    return of(null);
  }

  deleteTask(id: number): Observable<Task | undefined> {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      const deletedTask = tasks.splice(index, 1)[0];
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
      return of(deletedTask);
    }
    return of(undefined);
  }
}
