import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable()
export class UtilService {
  constructor() {}

  public static logInfo(info: string[]): void {
    console.log(
      '%cWebPushNG',
      'color:#0469d0;border:1px solid #0469d0;padding:1px 2px;border-radius: 2px',
      `[${moment(Date.now()).format('DD/MM/YYYY HH:mm:ss')}]`,
      ...info
    );
  }

  public static logError(error: string[]): void {
    console.error(
      '%cWebPushNG',
      'color:#f05f6d;border:1px solid #f05f6d;padding:1px 2px;border-radius: 2px',
      `[${moment(Date.now()).format('DD/MM/YYYY HH:mm:ss')}]`,
      ...error
    );
  }
}
