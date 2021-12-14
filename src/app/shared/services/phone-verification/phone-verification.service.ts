import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneVerificationService {

  constructor(private http: HttpClient) { }

  public verifyPhone(code: string): Observable<any> {
    return this.http.post<any>(`phone/verification/confirm/`, { code });
  }

  public sendVerificationCode(): Observable<any> {
    return this.http.post<any>(`phone/verification/`, {});
  }
}
