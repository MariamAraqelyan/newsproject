import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { AuthService } from 'src/app/shared/services/auth';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private AuthService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.AuthService.getAccessToken();
    const clonedRequest = authToken ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` }}) : req;

    return next.handle(clonedRequest).pipe(
      catchError(er => {
        if (er.status === 401 && this.AuthService.isLoggedIn()) {
          this.AuthService.logout().subscribe(() => this.router.navigate(['/']));
        }

        return throwError(er);
      })
    );
  }
}
