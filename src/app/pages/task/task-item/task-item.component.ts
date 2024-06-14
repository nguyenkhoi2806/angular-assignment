import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  constructor(public dateUtil: DateUtil) {}
}
