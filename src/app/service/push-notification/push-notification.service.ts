import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  registerUserAndDevice(formData: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/api/users/create',
      formData
    );
  }
}
