import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NotificationType,
  NotificationService,
  Notification,
} from 'app/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;
  bgClass: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      this.notification = notification;
      if (notification) {
        this.bgClass = this.getBgClass(notification.type);
      }
    });
  }

  close() {
    this.notificationService.hide();
  }

  getBgClass(type: NotificationType): string {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  }
}
