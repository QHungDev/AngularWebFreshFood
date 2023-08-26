import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductMainCategoryService {

  constructor(private httpClient: HttpClient) {
  }
  getProductMainCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product-main-category/get`);
  }
  getProductMainCate(productMainCategoryID: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/product-main-category/get/${productMainCategoryID}`);
  }
  updateProductMainCategories(productMainCategoryID: string, item: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/product-main-category/put?productMainCategoryID=${productMainCategoryID}`, item);
   }
  searchProductMainCategories(title: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product-main-category/searchall?title=${title}`);
  }
  deleteProductMain(productMainCategoryID: number) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/product-main-category/delete/${productMainCategoryID}`);
  }
  changeStatus(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product-main-category/ChangeStatus/${id}`);
  }
  addProductMain(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/product-main-category/post`, item);
  }
}
