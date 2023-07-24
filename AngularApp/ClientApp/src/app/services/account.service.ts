import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../requests/login-request';
import { SignupRequest } from '../requests/signup-request';
import { TokenResponse } from '../responses/token-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  login(LoginRequest: LoginRequest): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${environment.apiUrl}/account/login`, LoginRequest);
  }

  signup(SignupRequest: SignupRequest) {
    return this.httpClient.post(`${environment.apiUrl}/account/signup`, SignupRequest, { responseType: 'text' });
    //Mặc định API trả về object dạng JSON, thêm cấu hình { responseType: 'text' } để trả về 1 cột Username dạng text
  }

  logout() {
    return this.httpClient.post(`${environment.apiUrl}/account/logout`, null);
  }

  //Get danh sách account
  getAccounts(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/account/get`);
  }

  //Tìm kiếm tài khoản
  searchAccounts(username: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/account/searchall?username=${username}`);
  }

  //Get 1 tài khoản
  getAccount(username: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/account/get/${username}`);
  }

  //Thêm mới 1 tài khoản
  addAccount(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/account/post`, item);
  }

  //Cập nhật 1 tài khoản
  updateAccount(username: string, item: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/account/updateitem?username=${username}`, item);
  }

  //Xóa 1 tài khoản
  deleteAccount(username: string) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/account/delete/${username}`);
  }

  //Get danh sách account category
  getAccountCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/account-category/get`);
  }
}
