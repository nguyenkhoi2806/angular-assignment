import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { Task } from 'app/types/task';
import { DateUtil } from 'app/utils/date.util';
@Component({
  selector: '[app-task-item]',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<number>();

  constructor(public dateUtil: DateUtil) {}

  onDelete() {
    this.deleteTask.emit(this.task.id);
  }
}
