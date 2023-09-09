
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorResponse } from 'src/app/responses/error-response';
import { ArticleService } from 'src/app/services/article.service';
@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.css']
})
export class NewsIndexComponent {
  imgUrl: string = 'https://localhost:7265/api/product/2.jpg';
  imageToShow: any;
  isImageLoading: boolean | undefined;
  getImageRequest: any = {
    ArticleID: "",
    Avatar: "",
  };
  articles: any[] = [];
  constructor(private articleService: ArticleService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getImageFromService();
    this.activeRoute.queryParams.subscribe(params => {
        const articlesObservable = this.articleService.getArticles();
        articlesObservable.subscribe((articlesData: any[]) => {
          this.articles = articlesData;
        });
    });
  }
  showImg(imgName: any) {
    //var str = "FileUploads/Product/Avatar/f0f34b03-9f95-4efe-946a-39eb0d467af2.jpg"
    var name = imgName.split('/')[4]

    var imgUrl = 'https://localhost:7265/api/article/' + name;

    return imgUrl;
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  getImageFromService() {
    this.isImageLoading = true;

    this.articleService.getImage(this.imgUrl).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }
  detailArticle(e: Event, article: any) {
    e.preventDefault();
    this.router.navigate(['/news/detail'], { queryParams: { articleID: article.articleID } });
  }
}
