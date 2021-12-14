import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResetPasswordParams } from './reset-password.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  public sendEmail(email: string): Observable<any> {
    return this.http.post('password/reset/', { email });
  }

  public reset(params: IResetPasswordParams): Observable<any> {
    return this.http.post('password/reset/confirm/', params);
  }
}
