import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private httpClient: HttpClient) { }

  getProductCates(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product-category/get`);
  }
  getProductCate(productCategoryID: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/product-category/get/${productCategoryID}`);
  }
  getProductMainCates(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product-main-category/get`);
  }
  searchProductCate(title: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product-category/searchall?title=${title}`);
  }
  changeStatus(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product-category/ChangeStatus/${id}`);
  }
  UploadFile(productCategoryID: string, uploadedImage: any) {
    return this.httpClient.post(`${environment.apiUrl}/product-category/UploadImage?productCategoryID=${productCategoryID}`, uploadedImage);
  }
  updateProductCate(productCategoryID: string, item: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/product-category/put?productCategoryID=${productCategoryID}`, item);
  }
  addProductCate(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/product-category/post`, item);
  }
  deleteProductCate(productCategoryID: number) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/product-category/delete/${productCategoryID}`);
  }
}
