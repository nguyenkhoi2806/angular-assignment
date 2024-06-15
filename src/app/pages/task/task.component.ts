import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskService } from 'app/services/task.service';
import { Task } from 'app/types/task';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    TaskListComponent,
    FormsModule,
  ],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  tasks: Task[] = [];
  searchStatus: string = 'all';
  filteredTasks: Task[] = [];
  searchTerm: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  applyFilter() {
    const searchTermLowerCase = this.searchTerm.toLowerCase().trim();

    this.filteredTasks = this.tasks.filter((task) => {
      const matchesStatus =
        this.searchStatus === 'all' ||
        task.status.toLowerCase() === this.searchStatus.toLowerCase();
      const matchesSearchTerm =
        !searchTermLowerCase ||
        task.title.toLowerCase().includes(searchTermLowerCase) ||
        task.description.toLowerCase().includes(searchTermLowerCase);
      return matchesStatus && matchesSearchTerm;
    });
  }
}
