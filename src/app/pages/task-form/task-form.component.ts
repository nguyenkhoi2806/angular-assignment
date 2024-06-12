import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'app/services/task/task.service';
import { Task } from 'app/types/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-from.scss'],
})
export class TaskFormComponent {
  task: Task = {
    id: 0,
    title: '',
    status: false,
    description: '',
    dueDate: '',
  };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    if (this.task.title && this.task.description && this.task.dueDate) {
      console.log('Task data:', this.task);
    }
  }
}
