import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, TaskListComponent],
  templateUrl: './task.component.html',
})
export class TaskComponent {}
