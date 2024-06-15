import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmModalService } from 'app/services/confirm-modal.service';
import { NotificationService } from 'app/services/notification.service';

import { TaskService } from 'app/services/task.service';
import { Task } from 'app/types/task';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() loadTasks = new EventEmitter<void>();

  constructor(
    private taskService: TaskService,
    private confirmalModalSerivce: ConfirmModalService,
    private notificationService: NotificationService
  ) {}

  onDeleteTask(taskId: number) {
    this.confirmalModalSerivce.openModal(
      'Are you sure to delete this item?',
      () => {
        this.taskService.deleteTask(taskId).subscribe({
          complete: () => {
            this.notificationService.show('Delete successfully!', 'success');
            this.loadTasks.emit();
          },
        });
      }
    );
  }
}
