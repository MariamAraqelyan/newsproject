import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { ConfigService } from 'src/app/shared/services/config';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor(private ConfigService: ConfigService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = this.ConfigService.config.apiUrl;
    const validUrl = apiUrl + req.url;
    const clonedRequest = req.clone({ url: validUrl });

    return next.handle(clonedRequest);
  }
}
