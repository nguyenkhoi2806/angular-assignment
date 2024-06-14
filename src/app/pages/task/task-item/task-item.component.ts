import { Component, Input } from '@angular/core';

import { Task } from 'app/types/task';
import { DateUtil } from 'app/utils/date.util';

@Component({
  selector: '[app-task-item]',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;
  constructor(public dateUtil: DateUtil) {}
}
