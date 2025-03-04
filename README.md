# Web Push Application using Firebase written in Angular

This is a Firebase web push application implemented with Angular v19 and Bootstrap.

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

You can visit my [Medium](https://blog.stackademic.com/firebase-web-push-notification-with-go-and-angular-811698cffe70) post to read the details.

You can find the backend application implemented with Go in [my GitHub project](https://github.com/senoritadeveloper01/web-push).

## Dependencies

[firebase](https://www.npmjs.com/package/firebase) and [AngularFire](https://www.npmjs.com/package/@angular/fire) for Firebase Cloud Messaging.
You should install Angular fire with "ng add":

```bash
ng add @angular/fire
```

[Faker (@faker-js/faker)](https://www.npmjs.com/package/@faker-js/faker) to generate dummy email to register to web-push backend app.

[uuid](https://www.npmjs.com/package/uuid) to generate uuids to register to web-push backend app.

## Build and Run

Replace firebase-messaging-sw.ts and environment files' config content with you download from your Firebase project's console.

To build the project in production mode, run:

```bash
ng build --configuration production
```

Install [Live Server](https://www.npmjs.com/package/live-server) with npm globally.

```bash
npm install -g live-server
```

After the build is completed, run to serve with LiveServer with a port number which is not in use (you should be under the root directory of your project when running the following command):

```bash
live-server ./dist/web-push-ng/browser --port=8085
```

## Screenshots

Firefox and Safari needs user interaction to grant for notification permission:

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-safari.png" width="500" />

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-firefox.png" width="500" />

Chrome requests for permission:

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-01.png" width="500" />

User grants permission and token is saved at the backend side:

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-02.png" width="500" />

Push notification is sent when browser is not in focus (background message):

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-03.png" width="500" />

Background message received console log:

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-04.png" width="500" />

Message received when browser is in focus (see last console log):

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-05.png" width="500" />

All received notifications listed on page:

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-06.png" width="500" />

Saved database records:

<img src="https://raw.githubusercontent.com/senoritadeveloper01/web-push-ng/main/screenshots/web-push-ng-screenshot-07.png" width="500" />

## Contributors

<img src="https://readme-typing-svg.demolab.com?font=Open+Sans&size=16&pause=1000&color=A6F73F&height=50&width=200&lines=Nil+Seri"/>

[Github 1](https://github.com/senoritadeveloper01)

[Github 2](https://github.com/nilseri01)

[Medium](https://senoritadeveloper.medium.com/)

## Copyright & Licensing Information

This project is licensed under the terms of the MIT license.
