import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'app/services/task/task.service';
import { Task } from 'app/types/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  task: Task = {
    id: 0,
    title: '',
    status: 'low',
    description: '',
    dueDate: '',
  };

  constructor(private taskService: TaskService) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.markFormTouched(form);
      return;
    }
    this.taskService.addTask(this.task);
  }

  markFormTouched(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
