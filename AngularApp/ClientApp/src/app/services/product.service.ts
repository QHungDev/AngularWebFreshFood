import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  //Get danh sách product

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product/get`);
  }
  getImg():Observable<any[]> {
  return this.httpClient.get<any[]>(`${environment.apiUrl}/FileUploads/Product/Avatar`);
  }
  //Get 1 product
  getProduct(productID: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/product/get/${productID}`);
  }

  //Thêm mới product
  addProduct(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/product/post`, item);
  }
  //Cập nhật product
  updateProduct(productID: string, item: any): Observable<any> {
  return this.httpClient.put<any>(`${environment.apiUrl}/product/put?productID=${productID}`, item);
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }
  // GetProductwithimage(productID:string,uploadedImage: any){
  //   return this.httpClient.post(`${environment.apiUrl}/product/GetProductwithimage?productID=${productID}`,uploadedImage);
  //   }
  UploadFile(productID:string,uploadedImage: any){
    return this.httpClient.post(`${environment.apiUrl}/product/UploadImage?productID=${productID}`,uploadedImage);
    }
    uploadImagev2(productID:string,imageFile: FormData): Observable<any> {
      return this.httpClient.post(`${environment.apiUrl}/product/uploadImagev2?productID=${productID}`, imageFile);
    }
  //Get danh sách account category
  getProductCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product-category/get`);
  }

  //Tìm kiếm product
  searchProducts(title: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product/searchall?title=${title}`);
  }
  //Xóa 1 product
  deleteProduct(productID: number) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/product/delete/${productID}`);
  }

  changeSellToday(id: any) {
    return this.httpClient.put<any>(`${environment.apiUrl}/product/changeSellToday/${id}`, {});
  }

  //Request Supply
  addRequestSupply(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/product/postRequestSupply`, item);
  }
  getRequestSupply(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/product/getRequestSupply`);
  }
  approveRequestSupply(id: any) {
    return this.httpClient.put<any>(`${environment.apiUrl}/product/approveRequestSupply/${id}`, {});
  }
  postRating(ratingData: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/product-vote/get/${ratingData}`);
  }
}
