import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
  CanLoad,
  UrlSegment
} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth';
import { UserService, Roles } from 'src/app/shared/services/user';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  private loginMsg = 'Please log in before viewing that page!';
  private roleMsg = 'You don\'t have permission to view this page!';

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private UserService: UserService,
    private SnackbarService: SnackbarService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAccess(route?.data?.roles);
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.checkAccess(route?.data?.roles);
  }

  private checkAccess(roles: Roles[]): boolean | UrlTree | Observable<boolean | UrlTree> {
    return roles ? this.checkRolePermissions(roles) : this.checkAuth();
  }

  private checkAuth(): boolean | UrlTree {
    const isAllowed = this.AuthService.isLoggedIn();

    if (!isAllowed) {
      this.router.navigate(['/sign-in']);
      this.SnackbarService.error(this.loginMsg);
    }

    return isAllowed;
  }

  private checkRolePermissions(roles: Roles[]): Observable<boolean | UrlTree> {
    return this.UserService.getUser().pipe(
      switchMap((user) => {
        const hasPermission = this.AuthService.isLoggedIn() && roles.some((role) => role === user.role);

        return hasPermission ? of(hasPermission) : throwError('No Permission!');
      }),
      catchError((err) => {
        const isLogged = this.AuthService.isLoggedIn();
        this.router.navigate([isLogged ? '/' : '/sign-in']);
        this.SnackbarService.error(isLogged ? this.roleMsg : this.loginMsg);

        return of(false);
      })
    );
  }
}
