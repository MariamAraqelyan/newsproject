import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {IUser, IUserResponse, IUpdateUserParams} from './user.interface';
import {Observable, of, ReplaySubject, Subject, throwError, timer} from 'rxjs';
import {catchError, retryWhen, switchMap, takeUntil} from 'rxjs/operators';
import {CURRENT_USER_ID_KEY} from './user.constants';
import {Roles} from './roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserId = +localStorage.getItem(CURRENT_USER_ID_KEY);
  private userSubject = new ReplaySubject<IUser>(1);
  private user$ = this.userSubject.asObservable();
  private destroy$ = new Subject();

  constructor(
    private http: HttpClient,
    private SnackbarService: SnackbarService
  ) {
  }

  public getUser(): Observable<IUser | null> {
    return this.user$;
  }

  public getCurrentUserId(): number {
    return this.currentUserId;
  }

  public removeUser(): void {
    this.currentUserId = null;
    this.destroy$.next(null);
    this.userSubject.next(null);
    localStorage.removeItem(CURRENT_USER_ID_KEY);
    sessionStorage.removeItem('postFilterKey');
  }

  public setCurrentUserId(id: number): Observable<IUser> {
    this.removeUser();

    localStorage.setItem(CURRENT_USER_ID_KEY, `${id}`);
    this.currentUserId = id;

    return this.fetchUser();
  }

  public fetchUser(): Observable<IUser> {
    if (!this.currentUserId) {
      this.removeUser();

      return of(null);
    }

    return this.getUserById(this.currentUserId).pipe(
      switchMap((user) => this.setUserWithRole(user)),
      retryWhen(() => timer(1)),
      catchError((err) => {
        this.SnackbarService.error('Failed to fetch the user!');

        return throwError(err);
      }),
      takeUntil(this.destroy$)
    );
  }

  public getUserById(id: number): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`users/${id}/`);
  }

  public updateUserData(data: IUpdateUserParams): Observable<IUser> {
    const params = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key];
      const isAvatar = key === 'avatar';
      isAvatar ? params.append(key, value, value.name) : params.append(key, value);
    });

    return this.http.patch<IUserResponse>(`users/${this.currentUserId}/`, params).pipe(
      switchMap((user) => this.setUserWithRole(user))
    );
  }

  private setCurrentUser(user: IUser): void {
    this.userSubject.next(user);
  }

  private setUserWithRole(user: IUserResponse): Observable<IUser> {
    // TODO: remove hardcode!!!
    sessionStorage.setItem('postFilterKey', JSON.stringify(user['feed_ordering']));
    const role = user.user_type || 1;
    const userWithRole = {...user, role, roleName: Roles[role]};
    this.setCurrentUser(userWithRole);

    return of(userWithRole);
  }
}
