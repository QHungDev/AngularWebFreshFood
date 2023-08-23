import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorResponse } from '../../responses/error-response';
import { ArticleService } from 'src/app/services/article.service';
@Component({
  selector: 'app-article-index',
  templateUrl: './article-index.component.html',
  styleUrls: ['./article-index.component.css']
})
export class ArticleIndexComponent implements OnInit {
  articles: any[] = [];
  keywords = '';
  constructor(private articleService: ArticleService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.keywords = params.username;

      if (!this.keywords) {
        const articleObservable = this.articleService.getArticles();
        articleObservable.subscribe((articlesData: any[]) => {
          this.articles = articlesData;
          console.log("hahaskja", this.articles)
        });
      }
      else {
        const articleObservable = this.articleService.searchArticles(this.keywords);
        articleObservable.subscribe((articlesData: any[]) => {
          this.articles = articlesData;
        });
      }
    });
  }
  showImg(imgName: any) {
    //var str = "FileUploads/Product/Avatar/f0f34b03-9f95-4efe-946a-39eb0d467af2.jpg"
    var name = imgName.split('/')[4]

    var imgUrl = 'https://localhost:7265/api/article/' + name;

    return imgUrl;
  }
  changeStatus(articleID: any,status:any) {
    this.articleService.changeStatus(articleID,status).subscribe();
    window.location.reload();
  }
  searchArticle(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/article/index'], { queryParams: { title: this.keywords } });
  }
  addArticle(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/article/detail']);
  }
  editArticle(e: Event, article: any) {
    e.preventDefault();
    this.router.navigate(['/article/detail'], { queryParams: { articleID: article.articleID } });
  }

  deleteArticle(e: Event, articleID: number) {
    e.preventDefault();

    var result = confirm("Bạn có chắc muốn xóa không?");
    if (result == true) {
      this.articleService.deleteArticle(articleID).subscribe({
        next: (data => {
          window.location.reload();
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }
  }
}
