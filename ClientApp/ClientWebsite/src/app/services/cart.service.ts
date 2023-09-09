import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient: HttpClient) {

  }
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  getProductsLocal(){
    return this.cartItemList = localStorage.getItem('localCart');
  }
  addtoCartLocal(product: any) {
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([product]));
      // this.cartItemList.emit([product]);
    }
    else {
      this.cartItemList = JSON.parse(localCart);
      this.cartItemList.push(product);
      localStorage.setItem('localCart', JSON.stringify(this.cartItemList));
      // this.cartItemList.emit(this.cartItemList)
    }
  }

  removetoCartLocal(productList: any) {
    localStorage.removeItem('localCart');
    if (productList.length > 0) {
      localStorage.setItem('localCart', JSON.stringify(productList));
    }
  }

  addOrder(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/order/post`, item);
  }

  addOrderDetail(item: any): Observable<any> {

    return this.httpClient.post<any>(`${environment.apiUrl}/order-detail/post`, item);
  }

  getOrder(client: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/order/getOrderByClient/${client}`);
  }

  getOrderList(orderID: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/order/get/${orderID}`);
  }

  getOrderDetailProduct(orderID: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/order-detail/get/${orderID}`);
  }

  updateOrder(orderID: string, item: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/order/put?orderID=${orderID}`, item);
  }

  cancelOrder(orderID: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/order/cancelOrder/${orderID}`, {});
  }

  sendEmail(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/send-email/post`, item);
  }

  // sendMomo(item: any) {
  //   debugger
  //   return this.httpClient.get<string>(`${environment.apiUrl}/momo/post`);
  // }
  sendMomo(item: any): Observable<any> {

    return this.httpClient.post<any>(`${environment.apiUrl}/momo/post`,item);
  }
  GetUserName(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/order/getOrderMomo`);
  }
  GetUserName2() {
    return this.httpClient.get<any>(`${environment.apiUrl}/momo/getOrderMomo2`);
  }
  // public callRedirection(body: any): Observable<any> {

  //   return this.httpClient.post(`${environment.apiUrl}/momo/post`, body)
  //     .map((response) => {

  //       //how to handle redirect here
  //       this.router.navigate(response.url)

  //     })
  //    .catch(error => {  console.log(error) });
  //   }
}
