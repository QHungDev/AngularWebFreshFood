import { Component, OnInit, getNgModuleById } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent {
  articleCategories: any[] = [];
  form: FormGroup;
  postArticleRequest: any = {
    ArticleID: "",
    Thumb: "",
    Title: "",
    Avatar: "",
    Description: "",
    Position: "",
    CreateBy: "",
    CreateTime: new Date(),
    Status: true,
    ArticleCategoryID: ""
  };
  articleID = '';
  constructor(private articleService: ArticleService, private router: Router,
    public formBuilder: FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute) {
      this.form = this.formBuilder.group({
        articleCategoryID: [''],
        title: [''],
        thumb: [''],
        avatar: [''],
        description: [''],
        content: [''],
        createTime:[''],
        createBy:[''],
        imageList: [''],
        position: [''],
        status: [true]
      });
    }
    ngOnInit(): void {
      const articleObservable = this.articleService.getArticleCategories();
      articleObservable.subscribe((articlesData: any[]) => {
        this.articleCategories = articlesData;

        this.activeRoute.queryParams.subscribe(params => {
          this.articleID = params.articleID;

          if (this.articleID && this.articleID !== "") {
            const articleObservable = this.articleService.getArticle(this.articleID);
            articleObservable.subscribe((articlesData: any) => {
              this.postArticleRequest = articlesData;
            });
          }
        });
      });
    }
    showImg(imgName: any) {
      //var str = "FileUploads/Product/Avatar/f0f34b03-9f95-4efe-946a-39eb0d467af2.jpg"
      if (imgName !== undefined) {
        var name = imgName.split('/')[4]

        var imgUrl = 'https://localhost:7265/api/article/' + name;

        return imgUrl;
      }
      return
    }
}
