import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { SnackbarState } from 'app/components/snackbar/snackbar.state';
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

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.markFormTouched(form);
      return;
    }
    this.taskService.addTask(this.task).subscribe({
      complete: () => {
        SnackbarState.update((currentSnackbar) => {
          return {
            ...currentSnackbar,
            visible: true,
            type: 'warning',
            title: 'Success',
            description: 'Task added successfully!',
          };
        });
        this.router.navigate(['/tasks']);
      },
      error: () =>
        SnackbarState.update((currentSnackbar) => {
          return {
            ...currentSnackbar,
            visible: true,
            type: 'error',
            title: 'Error',
            description: 'Plesase try again',
          };
        }),
    });
  }

  markFormTouched(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
