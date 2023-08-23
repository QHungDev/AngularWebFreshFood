import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { EditorModule,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  editorConfig = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',        // Suffix to use when loading resources
    plugins: 'lists link image table wordcount'
  }
  uploadedImage: File| undefined;
  imgModified:any;
  productCategories: any[] = [];
  form: FormGroup;
  postProductRequest: any = {
    ProductID: "",
    Thumb: "",
    Title: "",
    Avatar: "",
    Description: "",
    Content: "",
    Specification: "",
    Warranty: "",
    Accessories: "",
    Price: "",
    OldPrice: "",
    Quantity: "",
    ImageList: "",
    Position: "",
    CreateBy: "",
    CreateTime: new Date(),
    Status: true,
    ProductCategoryID: ""
  };
  productID = '';

  constructor(private productService: ProductService, private router: Router,
    public formBuilder: FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({
      productCategoryID: [''],
      username: [''],
      title: [''],
      thumb: [''],
      avatar: [''],
      description: [''],
      content: [''],
      specification: [''],
      warranty: [''],
      accessories: [''],
      price: [''],
      oldPrice: [''],
      quantity: [''],
      createTime:[''],
      createBy:[''],
      imageList: [''],
      position: [''],
      status: [true]
    });
  }

  ngOnInit(): void {
    const productsObservable = this.productService.getProductCategories();
    productsObservable.subscribe((productsData: any[]) => {
      this.productCategories = productsData;

      this.activeRoute.queryParams.subscribe(params => {
        this.productID = params.productID;

        if (this.productID && this.productID !== "") {
          const productsObservable = this.productService.getProduct(this.productID);
          productsObservable.subscribe((productsData: any) => {
            this.postProductRequest = productsData;
          });
        }
      });
    });
  }

  backToList(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product']);
  }

  saveProduct(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product']);
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

      var imgUrl = 'https://localhost:7265/api/product/' + name;

      return imgUrl;
    }

    return
  }

  submitForm() {
    var productCategoryID = this.form.get('productCategoryID')?.value;
    var title = this.form.get('title')?.value;
    var avatar = this.form.get('avatar')?.value;
    var productID = this.form.get('productID')?.value;
    var thumb = this.form.get('thumb')?.value;
    var description = this.form.get('description')?.value;
    var specification = this.form.get('specification')?.value;
    var content = this.form.get('content')?.value;
    var warranty = this.form.get('warranty')?.value;
    var price = this.form.get('price')?.value;
    var oldPrice = this.form.get('oldPrice')?.value;
    var quantity = this.form.get('quantity')?.value;
    var imageList = this.form.get('imageList')?.value;
    var position = this.form.get('position')?.value;
    var createTime = this.form.get('createTime')?.value;
    var createBy = this.form.get('createBy')?.value;
    var status = this.form.get('status')?.value;
    this.postProductRequest.Title = title;
    this.postProductRequest.ProductID = productID;
    this.postProductRequest.Thumb = thumb;
    this.postProductRequest.Description = description;
    this.postProductRequest.Avatar = avatar;
    this.postProductRequest.Specification = specification;
    this.postProductRequest.Content = content;
    this.postProductRequest.Warranty = warranty;
    this.postProductRequest.Price = price;
    this.postProductRequest.OldPrice = oldPrice;
    this.postProductRequest.Quantity = quantity;
    this.postProductRequest.ImageList = imageList;
    this.postProductRequest.Position = position;
    this.postProductRequest.CreateTime = new Date();
    this.postProductRequest.CreateBy = window.localStorage.getItem('Username');
    this.postProductRequest.Status = status;
    this.postProductRequest.ProductCategoryID = productCategoryID;
    let imageFormData:any = new FormData();
    if (this.uploadedImage !== undefined ) {
      imageFormData.append('this.postProductRequest.Avatar', this.uploadedImage, this.uploadedImage?.name);
    }
    console.log("formdata",imageFormData);
    const updateProductforkJoin = this.productService.updateProduct(this.productID, this.postProductRequest);
    const upLoadImageforkJoin = this.productService.UploadFile(this.productID,imageFormData);
    if (this.productID && this.productID !== "") {

      //Update
      if (this.postProductRequest.ProductCategoryID && this.postProductRequest.ProductCategoryID !== "" && this.postProductRequest.ProductCategoryID !== undefined) {
        forkJoin([updateProductforkJoin,upLoadImageforkJoin]).subscribe({
          next: (data => {
            this.router.navigate(['/product']);
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
      if (this.postProductRequest.ProductCategoryID && this.postProductRequest.ProductCategoryID !== "" && this.postProductRequest.ProductCategoryID !== undefined) {
        this.productService.addProduct(this.postProductRequest).subscribe({
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

  // addItem() {
  //   this.productService.addProduct(this.postProductRequest).subscribe({
  //     next: (data => {
  //       // this.router.navigate(['/product']);
  //     }),
  //     error: ((error: ErrorResponse) => {
  //       alert(error.Error);
  //     })
  //   });
  // }

  addImg() {

    let imageFormData:any = new FormData();
    if (this.uploadedImage !== undefined ) {
      imageFormData.append('this.postProductRequest.Avatar', this.uploadedImage, this.uploadedImage?.name);
    }
    this.productService.UploadFile("0",imageFormData).subscribe({
      next: (data => {
        this.router.navigate(['/product']);
      }),
      error: ((error: ErrorResponse) => {
        alert(error.Error);
      })
    });
  }



}
