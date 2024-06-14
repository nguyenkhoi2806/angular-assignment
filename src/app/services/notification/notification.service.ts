import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type Notification = {
  message: string;
  type: NotificationType;
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  show(message: string, type: NotificationType = 'info') {
    this.notificationSubject.next({ message, type });
    setTimeout(() => this.hide(), 2000);
  }

  hide() {
    this.notificationSubject.next(null);
  }
}
