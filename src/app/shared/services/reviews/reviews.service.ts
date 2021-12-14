import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview, IGetReviewsParams, IReviewResponse, ICreateReviewParams } from './reviews.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  public getUserReviews(data: IGetReviewsParams): Observable<IReviewResponse> {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => params = params.set(key, data[key]));

    return this.http.get<IReviewResponse>('reviews/', { params });
  }

  public createReview(params: ICreateReviewParams): Observable<IReview> {
    return this.http.post<IReview>('reviews/', params);
  }

  public voteReview(id: number, vote: boolean): Observable<IReview> {
    return this.http.post<IReview>(`reviews/${id}/vote/`, { vote });
  }

  public voteReply(id: number, vote: boolean): Observable<IReview> {
    return this.http.post<IReview>(`reviews/${id}/replies/vote/`, { vote });
  }

  public replyReview(id: number, text: string): Observable<IReview> {
    return this.http.post<IReview>(`reviews/${id}/replies/`, { text });
  }
}
