import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpHelper } from '../helpers/http-helper';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
	private loginUrl = 'user/authenticate';
	private recoverPasswordUrl = 'user/password/recover';
	private changePasswordUrl = 'user/password/assign';

	constructor(public router: Router, private http: HttpClient, private httpHelper: HttpHelper) {
	}

	login(loginForm): Observable<any> {
		return this.http.post<any>(this.getGETURL(this.loginUrl), '', {
			observe: 'response',
		    headers: {'x-username': loginForm.username, 'x-password': loginForm.password, 'x-recaptcha': loginForm.recaptcha}
		}).pipe(catchError(this.errorHandler));
	}

	recoverPassword(email) {
		const obj = {email: email};
		return this.http.post<any>(this.getGETURL(this.recoverPasswordUrl, obj), '').pipe(catchError(this.errorHandler));
	}

	changePassword(newPassword, hash) {
		const passwordParameter = {password: newPassword};
		const hashParameter = {hash: hash};
		return this.http.post<any>(this.getGETURL(this.changePasswordUrl, hashParameter), passwordParameter).pipe(catchError(this.errorHandler));
	}

	private getGETURL(path, filter?) {
		const url = environment.apiUrl + path;
		if (filter === undefined) {
			return url;
		}
		return url + this.httpHelper.getQueryString(filter);
	}

	errorHandler(error) {
		console.log(error);
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
