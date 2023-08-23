import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductMainCategoryService } from 'src/app/services/product-main-category.service';

@Component({
  selector: 'app-product-main-category-detail',
  templateUrl: './product-main-category-detail.component.html',
  styleUrls: ['./product-main-category-detail.component.css']
})
export class ProductMainCategoryDetailComponent implements OnInit {
  form: FormGroup;
  keywords = '';
  postproductMainCategoryRequest: any = {
    ProductMainCategoryID: "",
    Title: "",
    Position: "",
    Status: true,
    CreateTime: "",
    CreateBy: "",
  };
  productMainCategoryID = '';
  productMainCategories: any[] = [];
  constructor(private productMainCategoryService: ProductMainCategoryService, private router: Router,
    public formBuilder: FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({
      title: [''],
      position: [''],
      status: [true],
      createTime: [''],
      createBy: [''],
    });
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.productMainCategoryID = params.productMainCategoryID;
      if (this.productMainCategoryID && this.productMainCategoryID !== "") {
        const productMainCategoriesObservable = this.productMainCategoryService.getProductMainCate(this.productMainCategoryID);
        productMainCategoriesObservable.subscribe((productMainCategoriesData: any) => {
          this.postproductMainCategoryRequest = productMainCategoriesData;
          console.log("hhh", this.postproductMainCategoryRequest)
        });
      }
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.keywords = params.title;

      if (!this.keywords) {
        const productMainCategoriesObservable = this.productMainCategoryService.getProductMainCategories();
        productMainCategoriesObservable.subscribe((productMainCategoriesData: any[]) => {
          this.productMainCategories = productMainCategoriesData;
        });
      }
      else {
        const productMainCategoriesObservable = this.productMainCategoryService.searchProductMainCategories(this.keywords);
        productMainCategoriesObservable.subscribe((productMainCategoriesData: any[]) => {
          this.productMainCategories = productMainCategoriesData;
        });
      }
    });
  }
  submitForm() {
    var productMainCategoryID = this.form.get('productMainCategoryID')?.value;
    var title = this.form.get('title')?.value;
    var position = this.form.get('position')?.value;
    var status = this.form.get('status')?.value;
    var createTime = this.form.get('createTime')?.value;
    var createBy = this.form.get('createBy')?.value;
    this.postproductMainCategoryRequest.ProductMainCategoryID = productMainCategoryID;
    this.postproductMainCategoryRequest.Title = title;
    this.postproductMainCategoryRequest.Position = position;
    this.postproductMainCategoryRequest.Status = status;
    this.postproductMainCategoryRequest.CreateTime = createTime;
    this.postproductMainCategoryRequest.CreateBy = createBy;
    if (this.productMainCategoryID && this.productMainCategoryID !== "" && this.postproductMainCategoryRequest.productMainCategoryID !== undefined) {
      //Update
      this.productMainCategoryService.updateProductMainCategories(this.productMainCategoryID, this.postproductMainCategoryRequest).subscribe({
        next: (data => {
          this.router.navigate(['/product-main-category']);
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

