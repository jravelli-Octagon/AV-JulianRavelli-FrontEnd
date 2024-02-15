import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpHelper } from '../helpers/http-helper';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenService {
	private refreshUrl = 'user/refresh';


	constructor(public router: Router, private http: HttpClient, private httpHelper: HttpHelper) {
	}

	refresh(): Observable<any> {
		const token = sessionStorage.getItem('token');
		const refreshToken = sessionStorage.getItem('refreshToken');
		return this.http.post<any>(this.getGETURL(this.refreshUrl), '', {
			observe: 'response',
		    headers: {'x-token': token, 'x-refresh': refreshToken}
		})
		// .pipe(catchError(this.errorHandler))
		;
	}

	saveTokens(data) {
		sessionStorage.setItem('token', data.body.responseData.token);
		sessionStorage.setItem('refreshToken', data.body.responseData.refreshToken);
	}



	private getGETURL(path, filter?) {

		const url = environment.apiUrl + path;
		if (filter === undefined) {
			return url;
		}
		return url + this.httpHelper.getQueryString(filter);
	}

	private getPOSTURL(path) {
		return environment.apiUrl + path;
	}

	errorHandler(error) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			if (error.status === 400) {
				errorMessage = error.error.description;
			} else if (error.status === 500) {
				errorMessage = error.error.description;
			} else if (error.status === 401 || error.status === 0) {
				sessionStorage.removeItem('isLoggedin');
				sessionStorage.removeItem('token');
				location.reload();
			}
		}
		return throwError(errorMessage);
	}
}
