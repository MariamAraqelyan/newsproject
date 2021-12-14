import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IUserResponse, IUser, UserService } from 'src/app/shared/services/user';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { AuthService } from 'src/app/shared/services/auth';
import { of, Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JournalistResolverService implements Resolve<IUserResponse> {

  constructor(
    private AuthService: AuthService,
    private UserService: UserService,
    private SnackbarService: SnackbarService,
    private router: Router
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserResponse> {
    const user: IUser = this.router.getCurrentNavigation()?.extras?.state?.user;
    const isLoggedin = this.AuthService.isLoggedIn();
    const ID = +route.paramMap.get('id');

    if (isLoggedin && ID === this.UserService.getCurrentUserId()) {
      return this.UserService.fetchUser().pipe(
        take(1)
      );
    }

    if (user) {
      return of(user);
    }

    return this.UserService.getUserById(ID).pipe(
      catchError((err) => {
        this.SnackbarService.error('Failed to fetch a user!');
        this.router.navigate(['/']);

        return throwError(err);
      }),
      take(1)
    );
  }
}
