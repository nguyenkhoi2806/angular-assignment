import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';

import { TaskService } from 'app/services/task/task.service';
import { Task } from 'app/types/task';
import { NotificationService } from 'app/services/notification/notification.service';
import { DateUtil } from 'app/utils/date.util';

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
  minDate: string;
  isNewTask: boolean = true;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private notificationService: NotificationService,
    public dateUtil: DateUtil,
    private route: ActivatedRoute
  ) {
    this.minDate = this.dateUtil.getCurrentDate();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isNewTask = false;
        const taskId = Number(params['id']);
        this.taskService.getTask(taskId).subscribe(
          (task) => {
            this.task = { ...task! };
          },
          (error) => {
            console.error('Error fetching task:', error);
          }
        );
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.markFormTouched(form);
      return;
    }
    const taskObservable = this.isNewTask
      ? this.taskService.addTask(this.task)
      : this.taskService.updateTask(this.task);

    taskObservable.subscribe({
      complete: () => {
        this.notificationService.show('Save successfully!', 'success');
        this.router.navigate(['/tasks']);
      },
      error: () => this.notificationService.show('Please try again', 'error'),
    });
  }

  markFormTouched(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  validateDate(dueDate: NgModel) {
    const selectedDate = new Date(dueDate.value);
    const currentDate = new Date();

    if (isNaN(selectedDate.getTime())) {
      dueDate.control.setErrors({ invalidDate: true });
    } else {
      if (selectedDate < currentDate) {
        dueDate.control.setErrors({ pastDate: true });
      } else {
        dueDate.control.setErrors(null);
      }
    }
  }
}
