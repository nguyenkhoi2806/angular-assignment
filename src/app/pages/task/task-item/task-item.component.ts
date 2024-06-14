import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { TaskService } from 'app/services/task.service';
import { Task } from 'app/types/task';
import { DateUtil } from 'app/utils/date.util';
import { ConfirmModalService } from 'app/services/confirm-modal.service';
import { NotificationService } from 'app/services/notification.service';
@Component({
  selector: '[app-task-item]',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;

  constructor(
    public dateUtil: DateUtil,
    private taskService: TaskService,
    private confirmalModalSerivce: ConfirmModalService,
    private notificationService: NotificationService
  ) {}

  onDelete() {
    this.confirmalModalSerivce.openModal(
      'Are you sure to delete this item?',
      () => {
        this.taskService.deleteTask(this.task.id).subscribe({
          complete: () => {
            this.notificationService.show('Delete successfully!', 'success');
          },
        });
      }
    );
  }
}
