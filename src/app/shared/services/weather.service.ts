import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpHelper } from '../helpers/http-helper';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {
	private getWeatherByURL = 'weather/getBy';

	constructor(public router: Router, private http: HttpClient, private httpHelper: HttpHelper) {
	}


	getWeatherBy(filter): Observable<any> {
		return this.http.get(this.getGETURL(this.getWeatherByURL, filter)).pipe(catchError(this.errorHandler));
	}

	// saveExcel(jsonTable): Observable<any> {
	//     return this.http.post(this.getGETURL(this.getExcelFile), JSON.stringify(jsonTable),
	// 		{responseType: 'blob' as 'json'}).pipe(catchError(this.errorHandler));
	// }


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
