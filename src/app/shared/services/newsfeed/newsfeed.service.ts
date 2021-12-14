import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {INewsfeedParams, INewsfeedParamsByFilter, INewsfeedResponse} from './newsfeed.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private http: HttpClient) { }

  public getNews(data: INewsfeedParams): Observable<INewsfeedResponse> {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => params = params.set(key, data[key]));

    return this.http.get<INewsfeedResponse>('feed/', { params });
  }

  public getNewsByFilter(data: INewsfeedParamsByFilter): Observable<INewsfeedResponse> {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => params = params.set(key, data[key]));
    return this.http.get<INewsfeedResponse>('feed/', { params });
  }
}
