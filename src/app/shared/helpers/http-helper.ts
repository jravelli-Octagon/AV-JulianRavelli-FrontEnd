import { Injectable } from '@angular/core';

@Injectable()
export class HttpHelper {
  constructor() { }
  
  getQueryString(filter){
	  return "?"+Object.keys(filter).map(key => key + '=' + filter[key]).join('&');
  }
}