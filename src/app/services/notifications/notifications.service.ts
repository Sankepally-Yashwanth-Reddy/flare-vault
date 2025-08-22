import { Injectable, signal } from '@angular/core';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export interface AppNotification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _notifications = signal<AppNotification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  show(type: NotificationType, message: string): void {
    const id = crypto.randomUUID();
    const newNotification: AppNotification = {
      id,
      type,
      message,
      timestamp: new Date(),
      read: false,
    };

    // Add the notification
    this._notifications.update((notifs) => [newNotification, ...notifs]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => this.dismiss(id), 5000);
  }

  dismiss(id: string): void {
    this._notifications.update((notifs) => notifs.filter((n) => n.id !== id));
  }

  clearAll(): void {
    this._notifications.set([]);
  }
}
