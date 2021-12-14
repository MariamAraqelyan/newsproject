import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICommentsResponse, IGetCommentsParams, IComment, ICommentCreateParams } from './comments.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  public addComment(params: ICommentCreateParams): Observable<IComment> {
    return this.http.post<IComment>(`comments/`, params);
  }

  public getComments(postId: number, data: IGetCommentsParams): Observable<ICommentsResponse> {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => params = params.append(key, data[key]));

    return this.http.get<ICommentsResponse>(`posts/${postId}/comments/`, { params });
  }

  public getCommentsReplies(commentId: number, data: IGetCommentsParams): Observable<ICommentsResponse> {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => params = params.append(key, data[key]));

    return this.http.get<ICommentsResponse>(`comments/${commentId}/replies/`, { params });
  }
}
