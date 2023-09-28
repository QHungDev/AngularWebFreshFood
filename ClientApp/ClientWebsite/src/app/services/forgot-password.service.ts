import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private clientPassword$ = new BehaviorSubject<any>({});
  selectedClientPassword$ = this.clientPassword$.asObservable();
  constructor(private httpClient: HttpClient) {}

  setClientPassword(clientPassword: any) {
    this.clientPassword$.next(clientPassword);
  }

  forgotPassword(item: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/client/forgotPassword`, item);
  }
}
