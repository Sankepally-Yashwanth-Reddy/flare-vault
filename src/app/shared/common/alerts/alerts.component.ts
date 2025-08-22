import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationsService } from '../../../services/notifications/notifications.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent {
  service = inject(NotificationsService);
}
