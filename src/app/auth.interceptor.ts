import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);

  // never attach credentials to the OAuth2 endpoints themselves
  if (req.url.indexOf('/oauth/') > -1) {
    return next(req);
  }

  const token = auth.accessToken;
  const authedReq = token
    ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    : req;

  return next(authedReq).pipe(
    catchError((err: unknown) => {
      // expired access token: refresh once, then replay the original request
      if (err instanceof HttpErrorResponse && err.status === 401 && auth.hasRefreshToken) {
        return auth.refreshAccessToken().pipe(
          switchMap((newToken) => next(req.clone({ setHeaders: { Authorization: 'Bearer ' + newToken } })))
        );
      }
      return throwError(() => err);
    })
  );
};
