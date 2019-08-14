import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaySystemsService {
  
  API_METHOD = `/api/payment-systems/`;


  constructor(private httpClient: HttpClient) { }

  getPayMethods(params) {
    // Need intercept this parametres.
    params.key = env.apiKey
    params.sign = env.sign
    params.sign_version = 2
    return this.httpClient.get(env.apiUrl + this.API_METHOD, {params: params});
  }
}
