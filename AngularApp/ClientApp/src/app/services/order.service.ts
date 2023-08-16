import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/order/get`);
  }
  searchOrders(username: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/order/searchall?username=${username}`);
  }

  changeConfirmStatus(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/order/ChangeConfirmStatus/${id}`);
  }
}
