import { Component } from '@angular/core';
import { PushNotificationComponent } from './components/push-notification/push-notification.component';
import { NotificationSettingsComponent } from './components/notification-settings/notification-settings.component';

@Component({
  selector: 'app-root',
  imports: [PushNotificationComponent, NotificationSettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web-push-ng';
  notificationPermissionSet = false;

  setNotificationPermission(enabled: boolean): void {
    this.notificationPermissionSet = enabled;
  }
}
