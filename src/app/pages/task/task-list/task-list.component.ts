import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ConfirmModalComponent } from 'app/components/confirm-modal/confirm-modal.component';
import { TaskService } from 'app/services/task/task.service';
import { Task } from 'app/types/task';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, ConfirmModalComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  tasks: Task[] = [];
  showModal: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  openOnDelete() {
    this.showModal = true;
  }

  onConfirmed() {
    console.log('Action confirmed');
    this.closeModal();
  }

  onClosed() {
    console.log('Modal closed');
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
  }
}
