import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createFormDataParams } from 'src/app/shared/utils/form-data';
import {
  IPSAParams,
  IArticleParams,
  IMemeParams,
  IPsaPost,
  IGetPostsParams,
  IPostsResponse,
  ICreatePollParams,
  IMemePost,
  IArticlePost,
  IPollPost,
  IRepostParams,
  IGetUserPostsParams,
  IGeneralPost
} from './posts.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public createPSA(params: IPSAParams): Observable<IPsaPost> {
    return this.http.post<IPsaPost>('psas/', params);
  }

  public createArticle(data: IArticleParams): Observable<IArticlePost> {
    const params = createFormDataParams(data, 'image');

    return this.http.post<IArticlePost>('articles/', params);
  }

  public createMeme(data: IMemeParams): Observable<IMemePost> {
    const params = createFormDataParams(data, 'image');

    return this.http.post<IMemePost>('memes/', params);
  }

  public createRepost(params: IRepostParams): Observable<any> {
    return this.http.post('reposts/', params);
  }

  public createPoll(params: ICreatePollParams): Observable<IPollPost> {
    return this.http.post<IPollPost>('polls/', params);
  }

  public getUserPosts(data: IGetUserPostsParams): Observable<IPostsResponse> {
    const id = data.id;
    delete data.id;

    let params = new HttpParams();
    Object.keys(data).forEach((key) => params = params.append(key, data[key]));

    return this.http.get<IPostsResponse>(`users/${id}/posts/`, { params });
  }

  public getPosts(data: IGetPostsParams): Observable<IPostsResponse> {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => params = params.append(key, data[key]));

    return this.http.get<IPostsResponse>('posts/', { params });
  }

  public getPostBySlug(slug: string): Observable<IGeneralPost> {
    return this.http.get<IGeneralPost>(`posts/${slug}/`);
  }

  public upvotePost(id: number): Observable<IGeneralPost> {
    return this.http.post<IGeneralPost>(`posts/${id}/upvote/`, {});
  }

  public votePoll(id: number, choiceId: number): Observable<IPollPost> {
    return this.http.post<IPollPost>(`posts/${id}/choices/${choiceId}/`, { });
  }

  public getRelatedStories(postId: number): Observable<IArticlePost[]> {
    return this.http.get<IArticlePost[]>(`posts/${postId}/related/`);
  }

  public updatePSA(ID: number, data: IPSAParams): Observable<IPsaPost> {
    const params = createFormDataParams(data);

    return this.http.put<IPsaPost>(`posts/${ID}/`, params);
  }

  // TODO: check with api
  public updateArticle(ID: number, data: IArticleParams): Observable<IArticlePost> {
    const params = createFormDataParams(data, 'image');

    return this.http.put<IArticlePost>(`posts/${ID}/`, params);
  }

  public deletePost(id: number): Observable<any> {
    return this.http.delete(`posts/${id}/`);
  }
}
