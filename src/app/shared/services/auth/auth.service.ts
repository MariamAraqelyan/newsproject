import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ILoginParams, ISignUpParams, ILoginResponse, IRefreshResponse} from './auth.interface';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ACCESS_TOKEN_SET_TIME_KEY} from './auth.constants';
import {createFormDataParams} from 'src/app/shared/utils/form-data';
import {OneSignalService} from 'src/app/shared/services/one-signal';
import {ConfigService} from 'src/app/shared/services/config';
import {UserService} from 'src/app/shared/services/user';
import {switchMap, takeUntil, finalize, take} from 'rxjs/operators';
import {Observable, NEVER, Subject, timer} from 'rxjs';
import {IGetUserPostsParams, IPostsResponse} from '../posts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private checkIntervalInSeconds = this.ConfigService.config.accessTokenCheckSecondsInterval;
  private tokenLifetimeInMinutes = this.ConfigService.config.accessTokenMinutesLifetime;
  private authStatusChange$ = new Subject<boolean>();
  private destroy$ = new Subject();

  constructor(
    private http: HttpClient,
    private UserService: UserService,
    private ConfigService: ConfigService,
    private OneSignalService: OneSignalService
  ) {
  }

  public observeAuthStatusChange(): Observable<any> {
    return this.authStatusChange$.asObservable();
  }

  public login(data: ILoginParams): Observable<any> {
    return this.http.post('login/', data).pipe(
      switchMap((response: ILoginResponse) => {
        this.setAccessToken(response.access);
        this.setRefreshToken(response.refresh);
        this.runTokenRefreshCheck();
        this.authStatusChange$.next(true);
        this.OneSignalService.initSignal();

        return this.UserService.setCurrentUserId(response.id);
      }),
      take(1)
    );
  }

  public logout(): Observable<any> {
    const refresh_token = this.getRefreshToken();

    return this.http.post('logout/', {refresh_token}).pipe(
      finalize(() => {
        this.removeTokens();
        this.UserService.removeUser();
        this.OneSignalService.unsubscribe();
        this.authStatusChange$.next(false);
      })
    );
  }

  public signup(data: ISignUpParams): Observable<any> {
    const params = createFormDataParams(data, 'avatar');

    return this.http.post('signup/', params).pipe(
      switchMap((response: ILoginResponse) => {
        this.setAccessToken(response.access);
        this.setRefreshToken(response.refresh);
        this.runTokenRefreshCheck();

        return this.UserService.setCurrentUserId(response.id);
      })
    );
  }

  public isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  public getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public setAccessToken(token: string): void {
    const timestamp = (new Date().getTime());
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(ACCESS_TOKEN_SET_TIME_KEY, timestamp.toString());
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public runTokenRefreshCheck(): void {
    if (!this.isLoggedIn()) {
      return;
    }

    this.destroy$.next(true);
    timer(0, this.checkIntervalInSeconds * 1000).pipe(
      switchMap(() => this.isTokenValid() ? NEVER : this.refreshAccessToken()),
      takeUntil(this.destroy$)
    ).subscribe((response) => this.setAccessToken(response.access));
  }

  private refreshAccessToken(): Observable<IRefreshResponse> {
    const refresh = this.getRefreshToken();

    return this.http.post<IRefreshResponse>('token/refresh/', {refresh});
  }

  private removeTokens(): void {
    this.destroy$.next(true);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_SET_TIME_KEY);
  }

  private getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  private isTokenValid(): boolean {
    // reduce token lifetime by one interval
    const lifetime = this.tokenLifetimeInMinutes - this.checkIntervalInSeconds / 60;
    const timestamp = +localStorage.getItem(ACCESS_TOKEN_SET_TIME_KEY);
    const currentTimestamp = (new Date()).getTime();
    const minuteDiff = (currentTimestamp - timestamp) / 60000;
    const reducedInterval = lifetime / 2; // reduce lifetime to make token refresh faster TODO: refactor

    return !Number.isNaN(reducedInterval) ? minuteDiff < reducedInterval : false;
  }


  public creatorsList(): Observable<any> {
    return this.http.get('featured_users/');
  }

}
