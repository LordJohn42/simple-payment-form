import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }

  getCountryByCode(code){
    return this.httpClient.get(`${environment.countryApi + decodeURI(code)}`);
  }
}
