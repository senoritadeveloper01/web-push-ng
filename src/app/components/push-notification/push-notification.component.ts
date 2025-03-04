import { Component, effect, inject, input, OnInit } from '@angular/core';
import { getToken, MessagePayload, onMessage } from 'firebase/messaging';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PushNotificationService } from '@service/push-notification/push-notification.service';
import { environment } from 'src/environments/environment';
import { UtilService } from '@service/utils.service';
import { CommonModule } from '@angular/common';
import { Messaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-push-notification',
  imports: [CommonModule],
  providers: [PushNotificationService],
  templateUrl: './push-notification.component.html',
  styleUrl: './push-notification.component.scss',
})
export class PushNotificationComponent implements OnInit {
  title = 'af-notification';
  email: string = '';
  deviceId: string = '';
  messagePayload?: MessagePayload;
  messagePayloadList: MessagePayload[] = [];
  private messaging = inject(Messaging);
  notificationPermissionInput = input.required<boolean>();

  constructor(
    public deviceDetectorService: DeviceDetectorService,
    private pushNotificationService: PushNotificationService
  ) {
    effect(() => {
      if (this.notificationPermissionInput() === true) {
        this.requestPermission();
        this.listen();
      }
    });
  }

  ngOnInit() {
    this.generateEmail();
    this.generateDeviceId();

    if (
      !this.deviceDetectorService.browser.toLowerCase().includes('safari') &&
      !this.deviceDetectorService.browser.toLowerCase().includes('firefox')
    ) {
      this.requestPermission();
      this.listen();
    }
  }

  requestPermission(): void {
    getToken(this.messaging, { vapidKey: environment.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          UtilService.logInfo(['We got the token: ', currentToken]);
          this.registerUserAndDevice(currentToken);
        } else {
          UtilService.logError([
            'No registration token available. Request permission to generate one.',
          ]);
        }
      })
      .catch((err) =>
        UtilService.logError([
          'An error occurred while retrieving token: ',
          err,
        ])
      );
  }

  registerUserAndDevice(token: string): void {
    const data = {
      userId: this.email,
      clientId: this.deviceId,
      credentials: token,
    };
    UtilService.logInfo(['Credentials to be saved: ', JSON.stringify(data)]);

    this.pushNotificationService.registerUserAndDevice(data).subscribe({
      next: (v) => {
        UtilService.logInfo(['Credentials saved to db: ', JSON.stringify(v)]);
      },
      error: (e) =>
        UtilService.logError([
          'An error occurred while saving credentials: ',
          e,
        ]),
    });
  }

  listen(): void {
    onMessage(this.messaging, (payload) => {
      UtilService.logInfo(['📩 Message received: ', JSON.stringify(payload)]);
      this.messagePayload = payload;
      this.messagePayloadList.push(payload);

      // Show notification (if permission is granted)
      if (Notification.permission === 'granted') {
        const notificationTitle = payload?.notification?.title || '';
        const notificationOptions = {
          body: payload?.notification?.body,
          icon: payload?.notification?.image,
        };
        new Notification(notificationTitle, notificationOptions);
      }
    });
    // onBackgroundMessage
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'FCM_BACKGROUND_MESSAGE') {
          UtilService.logInfo([
            '📩 Background Message Received:',
            JSON.stringify(event.data.payload),
          ]);
          this.messagePayload = event.data.payload;
          this.messagePayloadList.push(event.data.payload);
        }
      });
    }
  }

  generateEmail(): void {
    let currentEmail = localStorage.getItem('web-push-email');
    if (!currentEmail) {
      currentEmail = faker.internet.email();
      localStorage.setItem('web-push-email', currentEmail);
    }
    this.email = currentEmail;
  }

  generateDeviceId(): void {
    let currentDeviceId = localStorage.getItem('web-push-device-id');
    if (!currentDeviceId) {
      currentDeviceId = uuidv4();
      localStorage.setItem('web-push-device-id', currentDeviceId);
    }
    this.deviceId = currentDeviceId;
  }
}
