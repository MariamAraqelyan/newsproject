import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private router: Router,
    private AuthService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkPermissions();
  }

  public canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.checkPermissions();
  }

  private checkPermissions(): boolean | UrlTree {
    const isRedirectNeeded = this.AuthService.isLoggedIn();

    if (isRedirectNeeded) {
      this.router.navigate(['/']);
    }

    return !isRedirectNeeded;
  }
}
