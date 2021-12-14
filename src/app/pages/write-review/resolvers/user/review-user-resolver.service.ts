import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { IUserResponse, IUser, UserService } from 'src/app/shared/services/user';
import { of, Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewUserResolverService  implements Resolve<IUserResponse> {

  constructor(
    private router: Router,
    private UserService: UserService,
    private SnackbarService: SnackbarService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserResponse> {
    // TODO: return error in case if user is equal to current user
    const user: IUser = this.router.getCurrentNavigation()?.extras?.state?.user;
    const ID = +route.paramMap.get('id');

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