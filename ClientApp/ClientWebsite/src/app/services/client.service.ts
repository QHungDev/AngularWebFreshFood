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
  clientgets(item: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/client/get`, item);
  }
  clientget(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/client/get`);
  }
  clientcateget(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/client-category/get`);
  }
  logout() {
    return this.httpClient.post(`${environment.apiUrl}/client/logout`, null);
  }
  addClient(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/client/post`, item);
  }
  updateClient(item: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/client/put`, item);
  }
  getWithEmail(email: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/client/getWithEmail/${email}`);
  }
  sendEmailAuthenticCode(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/send-email/sendEmailAuthenticCode`, item);
  }
  updateClientPoint(id: any, point: any, bonus: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/client/UpdatePoint/${id}/${point}/${bonus}`, {});
  }
}

