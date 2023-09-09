import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../requests/login-request';
import { TokenResponse } from '../responses/token-response';
import {map, skipWhile, tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  login(LoginRequest: LoginRequest): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${environment.apiUrl}/client/login`, LoginRequest);
  }
  logout() {
    return this.httpClient.post(`${environment.apiUrl}/client/logout`, null);
  }
  addClient(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/client/post`, item);
  }
}

