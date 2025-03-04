import { CommonModule } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import { UtilService } from '@service/utils.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-notification-settings',
  imports: [CommonModule],
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.scss',
})
export class NotificationSettingsComponent implements OnInit {
  isBrowserPushSettingEnabled: boolean = true;
  browserPushPermission: string = '';
  notificationPermissionOutput = output<boolean>();

  constructor(public deviceDetectorService: DeviceDetectorService) {}

  ngOnInit() {
    this.getPushPermission();
  }

  getPushPermission(): void {
    if (!('Notification' in window)) {
      // Check if the browser supports notifications
      UtilService.logError([
        'This browser does not support desktop notification',
      ]);
      this.isBrowserPushSettingEnabled = false;
      return;
    }

    UtilService.logInfo([
      'Permissions exists in navigator: ',
      JSON.stringify('permissions' in navigator),
    ]);
    if ('permissions' in navigator) {
      this.isBrowserPushSettingEnabled = true;
      if (
        !this.deviceDetectorService.browser.toLowerCase().includes('safari') &&
        !this.deviceDetectorService.browser.toLowerCase().includes('firefox')
      ) {
        navigator.permissions
          .query({ name: 'notifications' })
          .then((notificationPermission) => {
            UtilService.logInfo([
              'Non-(Safari-Firefox) notification permissions: ',
              notificationPermission.state,
            ]);
            this.browserPushPermission = notificationPermission.state;
            notificationPermission.onchange = () => {
              this.browserPushPermission = notificationPermission.state;
            };
          });
      } else {
        Notification.requestPermission().then((notificationPermission) => {
          UtilService.logInfo([
            '(Safari-Firefox) notification permissions: ',
            notificationPermission,
          ]);
          this.browserPushPermission = notificationPermission;
        });
      }
    }
  }

  setPushPermission(): void {
    if (!('Notification' in window)) {
      // Check if the browser supports notifications
      this.isBrowserPushSettingEnabled = false;
      return;
    }

    Notification.requestPermission().then((permission) => {
      UtilService.logInfo(['Request permission response: ', permission]);
      this.browserPushPermission = permission;
      this.notificationPermissionOutput.emit(true);
    });
  }
}
