import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { EditorModule,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-product-category-detail',
  templateUrl: './product-category-detail.component.html',
  styleUrls: ['./product-category-detail.component.css']
})
export class ProductCategoryDetailComponent implements OnInit {
  editorConfig = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',        // Suffix to use when loading resources
    plugins: 'lists link image table wordcount'
  }
  uploadedImage: File| undefined;
  imgModified:any;
  productMainCategories: any[] = [];
  form: FormGroup;
  postProductCategoryRequest: any = {
    ProductCategoryID: "",
    Avatar: "",
    Thumb: "",
    Title: "",
    Description: "",
    Position: "",
    Status: true,
    CreateTime:'',
    CreateBy:'',
    ProductMainCategoryID: "0"
  };
  productCategoryID = '';

  constructor(private productCategoryService: ProductCategoryService, private router: Router,
    public formBuilder: FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute) {
      this.form = this.formBuilder.group({
        avatar: [''],
        thumb: [''],
        title: [''],
        description: [''],
        position: [''],
        status: [true],
        createTime: [''],
        createBy: [''],
        productMainCategoryID: ['0'],
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
      if (imgName !== undefined && imgName !== null) {
        var name = imgName.split('/')[4]

        var imgUrl = 'https://localhost:7265/api/product-category/' + name;

        return imgUrl;
      }

      return
    }

  ngOnInit(): void {
    const productCategoriesObservable = this.productCategoryService.getProductMainCates();
    productCategoriesObservable.subscribe((productCategoriesData: any[]) => {
      this.productMainCategories = productCategoriesData;

      this.activeRoute.queryParams.subscribe(params => {
        this.productCategoryID = params.productCategoryID;

        if (this.productCategoryID && this.productCategoryID !== "") {
          const productCategoriesObservable = this.productCategoryService.getProductCate(this.productCategoryID);
          productCategoriesObservable.subscribe((productCategoriesData: any) => {
            this.postProductCategoryRequest = productCategoriesData;
          });
        }
      });
    });
  }

  submitForm() {
    var productMainCategoryID = this.form.get('productMainCategoryID')?.value;
    var productCategoryID = this.form.get('productCategoryID')?.value;
    var avatar = this.form.get('avatar')?.value;
    var title = this.form.get('title')?.value;
    var description = this.form.get('description')?.value;
    var position = this.form.get('position')?.value;
    var description = this.form.get('description')?.value;
    var createTime = this.form.get('createTime')?.value;
    var createBy = this.form.get('createBy')?.value;
    var status = this.form.get('status')?.value;
    this.postProductCategoryRequest.ProductMainCategoryID = productMainCategoryID;
    this.postProductCategoryRequest.ProductCategoryID = productCategoryID;
    this.postProductCategoryRequest.Avatar = avatar;
    this.postProductCategoryRequest.Title = title;
    this.postProductCategoryRequest.Description = description;
    this.postProductCategoryRequest.Position = position;
    this.postProductCategoryRequest.CreateTime = new Date();
    this.postProductCategoryRequest.CreateBy = window.localStorage.getItem('Username');
    this.postProductCategoryRequest.Status = status;
    let imageFormData:any = new FormData();
    if (this.uploadedImage !== undefined ) {
      imageFormData.append('this.postProductCategoryRequest.Avatar', this.uploadedImage, this.uploadedImage?.name);
    }
    const updateProductCategoryforkJoin = this.productCategoryService.updateProductCate(this.productCategoryID, this.postProductCategoryRequest);
    const upLoadImageforkJoin = this.productCategoryService.UploadFile(this.productCategoryID,imageFormData);
    if (this.productCategoryID && this.productCategoryID !== "") {

      //Update
      if (this.postProductCategoryRequest.ProductMainCategoryID && this.postProductCategoryRequest.ProductMainCategoryID !== "" && this.postProductCategoryRequest.ProductMainCategoryID !== undefined) {
        forkJoin([updateProductCategoryforkJoin,upLoadImageforkJoin]).subscribe({
          next: (data => {
            this.router.navigate(['/product-category']);
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
    else {
      //Add new
      if (this.postProductCategoryRequest.ProductMainCategoryID && this.postProductCategoryRequest.ProductMainCategoryID !== "" && this.postProductCategoryRequest.ProductMainCategoryID !== undefined) {
        debugger
        this.productCategoryService.addProductCate(this.postProductCategoryRequest).subscribe({
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
    await this.addImg();
  }

  addImg() {

    let imageFormData:any = new FormData();
    if (this.uploadedImage !== undefined ) {
      imageFormData.append('this.postProductCategoryRequest.Avatar', this.uploadedImage, this.uploadedImage?.name);
    }
    this.productCategoryService.UploadFile("0",imageFormData).subscribe({
      next: (data => {
        this.router.navigate(['/product-category']);
      }),
      error: ((error: ErrorResponse) => {
        alert(error.Error);
      })
    });
  }



  }

