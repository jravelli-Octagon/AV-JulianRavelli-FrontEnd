import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { RefreshTokenService } from '../services/refreshToken.service';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private inject: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let authReq = request;
    const token = sessionStorage.getItem('token');
    if (token != null) {
      authReq = this.addTokenHeader(request, token);
    }
    return next.handle(authReq).pipe(
      catchError(errorData => {
        let errorMessage = '';
        if (errorData.error instanceof ErrorEvent) {
          errorMessage = errorData.error.message;
        } else {
          if (errorData.status === 401) {
              return this.handleRerfreshToken(request, next);
          }
        }
        return throwError(errorData);
      })
    );
  }

  handleRerfreshToken(request: HttpRequest<any>, next: HttpHandler) {
    const refreshTokenService = this.inject.get(RefreshTokenService);
    return refreshTokenService.refresh().pipe(
      switchMap((data: any) => {
        refreshTokenService.saveTokens(data);
        const token = sessionStorage.getItem('token');
        return next.handle(this.addTokenHeader(request, token));
      }),
      catchError(errorData => {
        this.logout();
        return throwError(errorData);
      })
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }

  logout() {
		sessionStorage.removeItem('isLoggedin');
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('refreshToken');
		location.reload();
	}

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
