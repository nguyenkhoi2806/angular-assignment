import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './task.component.html',
})
export class TaskComponent {}
