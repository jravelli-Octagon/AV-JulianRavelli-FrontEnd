import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpHelper } from '../helpers/http-helper';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ConfigService {
	private getProvincesURL = 'config/provinces';
	private getPersonalTypesURL = 'config/personalTypes';
	private getLocalitiesURL = 'country/localities';
	private getZIPCodesURL = 'country/zipcodes';
	private getCurrenciesURL = 'config/currencies';
	private getTaxSituationsURL = 'config/taxSituations';
	private getLocationTypesURL = 'config/locationTypes';
	private getListLocalitiesURL = 'locality/list';

	constructor(public router: Router, private http: HttpClient, private httpHelper: HttpHelper) {
	}

	getProvinces(): Observable<any> {
		return this.http.get(this.getGETURL(this.getProvincesURL)).pipe(catchError(this.errorHandler));
	}

	getLocalities(province): Observable<any> {

		return this.http.get(this.getGETURL(this.getLocalitiesURL, province)).pipe(catchError(this.errorHandler));
	}

	getZIPCodes(locality): Observable<any> {
		return this.http.get(this.getGETURL(this.getZIPCodesURL, locality)).pipe(catchError(this.errorHandler));
	}

	getPersonalIdTypes(): Observable<any> {
		return this.http.get(this.getGETURL(this.getPersonalTypesURL)).pipe(catchError(this.errorHandler));
	}

	getTaxSituations(): Observable<any> {
		return this.http.get(this.getGETURL(this.getTaxSituationsURL)).pipe(catchError(this.errorHandler));
	}

	getCurrencies(): Observable<any> {
		return this.http.get(this.getGETURL(this.getCurrenciesURL)).pipe(catchError(this.errorHandler));
	}

	getLocationTypes(): Observable<any> {
		return this.http.get(this.getGETURL(this.getLocationTypesURL)).pipe(catchError(this.errorHandler));
	}

	getLocalityList(): Observable<any> {
		return this.http.get(this.getGETURL(this.getListLocalitiesURL)).pipe(catchError(this.errorHandler));
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
