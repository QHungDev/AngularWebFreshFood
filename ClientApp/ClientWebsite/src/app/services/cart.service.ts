import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  getProductsLocal(){
    debugger
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
}
