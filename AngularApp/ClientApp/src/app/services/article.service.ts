import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }
  getArticles(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/article/get`);
  }
  getArticle(articleID: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/article/get/${articleID}`);
  }
  addArticle(item: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/article/post`, item);
  }
  updateArticle(articleID: string, item: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/article/put?articleID=${articleID}`, item);
    }
  searchArticles(title: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/article/searchall?title=${title}`);
  }
  changeStatus(articleID: any,status:any): Observable<any[]> {
    return this.httpClient.put<any>(`${environment.apiUrl}/article/put?articleID=${articleID}`, status);
  }
  getArticleCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/article-category/get`);
  }
  UploadFile(articleID:string,uploadedImage: any){
    return this.httpClient.post(`${environment.apiUrl}/article/UploadImage?articleID=${articleID}`,uploadedImage);
  }
  deleteArticle(articleID: number) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/article/delete/${articleID}`);
  }
}
