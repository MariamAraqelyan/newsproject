import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReportsParams, IReport } from './reports.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  public report(params: IReportsParams): Observable<IReport> {
    return this.http.post<IReport>('reports/', params);
  }
}
