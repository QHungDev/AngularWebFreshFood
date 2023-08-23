import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { EditorModule,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  editorConfig = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',        // Suffix to use when loading resources
    plugins: 'lists link image table wordcount'
  }
  uploadedImage: File| undefined;
  imgModified:any;
  articleCategories: any[] = [];
  form: FormGroup;
  postArticleRequest: any = {
    ArticleID: "",
    Avatar: "",
    Thumb: "",
    Title: "",
    Description: "",
    Content: "",
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
        avatar: [''],
        thumb: [''],
        title: [''],
        description: [''],
        content: [''],
        position: [''],
        createBy:[''],
        createTime: [''],
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
  onChangeUploadFile(e:Event) {
    this.uploadedImage = (e.target as HTMLInputElement)?.files?.[0];
    //var fileExtension = '.' + this.uploadedImage?.name.split('.').pop();
    //this.uploadedImage?.name.replace(this.uploadedImage.name,"/assets/img/FileUploads/Product/Avatar/"+fileExtension);
    console.log("thisimg",this.imgModified);

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
  submitForm() {
    var articleCategoryID = this.form.get('articleCategoryID')?.value;
    var title = this.form.get('title')?.value;
    var avatar = this.form.get('avatar')?.value;
    var articleID = this.form.get('articleID')?.value;
    var thumb = this.form.get('thumb')?.value;
    var description = this.form.get('description')?.value;
    var content = this.form.get('content')?.value;
    var position = this.form.get('position')?.value;
    var createTime = this.form.get('createTime')?.value;
    var createBy = this.form.get('createBy')?.value;
    var status = this.form.get('status')?.value;
    this.postArticleRequest.ArticleCategoryID = articleCategoryID;
    this.postArticleRequest.Title = title;
    this.postArticleRequest.Avatar = avatar;
    this.postArticleRequest.ArticleID = articleID;
    this.postArticleRequest.Thumb = thumb;
    this.postArticleRequest.Description = description;
    this.postArticleRequest.Content = content;
    this.postArticleRequest.Position = position;
    this.postArticleRequest.CreateTime = new Date();
    this.postArticleRequest.CreateBy = createBy
    this.postArticleRequest.Status = status;
    let imageFormData:any = new FormData();
    debugger
    if (this.uploadedImage !== undefined ) {
      imageFormData.append('this.postArticleRequest.Avatar', this.uploadedImage, this.uploadedImage?.name);
    }

    const updateArticleforkJoin = this.articleService.updateArticle(this.articleID, this.postArticleRequest);
    const upLoadImageforkJoin = this.articleService.UploadFile(this.articleID,imageFormData);

    if (this.articleID && this.articleID !== "") {

      //Update
      if (this.postArticleRequest.ArticleCategoryID && this.postArticleRequest.ArticleCategoryID !== "" && this.postArticleRequest.ArticleCategoryID !== undefined) {
        forkJoin([updateArticleforkJoin,upLoadImageforkJoin]).subscribe({
          next: (data => {
            this.router.navigate(['/article']);
          }),
          error: ((error: ErrorResponse) => {
            debugger
            alert(error.Error);
          })
        });
      }
      else {
        alert('error');
      }

    }
    else {
      //Add new
      if (this.postArticleRequest.ArticleCategoryID && this.postArticleRequest.ArticleCategoryID !== "" && this.postArticleRequest.ArticleCategoryID !== undefined) {
        this.articleService.addArticle(this.postArticleRequest).subscribe({
          next: (data => {
            // this.router.navigate(['/product']);
            this.add();
          }),
          error: ((error: ErrorResponse) => {
            alert(error.Error);
          })
        });
      }
      else {
        alert('error');
      }
    }
  }

  async add() {
    // await this.addItem();
    await this.addImg();
  }

  addImg() {

    let imageFormData:any = new FormData();
    if (this.uploadedImage !== undefined ) {
      imageFormData.append('this.postArticleRequest.Avatar', this.uploadedImage, this.uploadedImage?.name);
    }
    this.articleService.UploadFile("0",imageFormData).subscribe({
      next: (data => {
        this.router.navigate(['/article']);
      }),
      error: ((error: ErrorResponse) => {
        alert(error.Error);
      })
    });
  }
}
