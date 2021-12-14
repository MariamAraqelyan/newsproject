import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(private http: HttpClient) { }

  public subscribe(id: number): Observable<any> {
    return this.http.post(`followings/${id}/`, {});
  }

  public unsubscribe(id: number): Observable<any> {
    return this.http.delete(`followings/${id}/`);
  }
}
