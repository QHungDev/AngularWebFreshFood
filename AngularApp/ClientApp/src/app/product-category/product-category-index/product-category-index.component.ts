import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ChangeDetectorRef } from '@angular/core';
import { ErrorResponse } from 'src/app/responses/error-response';

@Component({
  selector: 'app-product-category-index',
  templateUrl: './product-category-index.component.html',
  styleUrls: ['./product-category-index.component.css']
})
export class ProductCategoryIndexComponent implements OnInit {
  productCategory: any[] = [];
  title = '';
  constructor(private productCategoryService: ProductCategoryService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.title = params.title;

      if (!this.title) {
        const productCategoryObservable = this.productCategoryService.getProductCates();
        productCategoryObservable.subscribe((productCategoryData: any[]) => {
          this.productCategory = productCategoryData;
        });
      }
      else {
        const productCategoryObservable = this.productCategoryService.searchProductCate(this.title);
        productCategoryObservable.subscribe((productCategoryData: any[]) => {
          this.productCategory = productCategoryData;
        });
      }
    });

  }

  editProductCategory(e: Event, productCategory: any) {
    e.preventDefault();
    this.router.navigate(['/product-category/detail'], { queryParams: { productCategoryID: productCategory.productCategoryID } });

  }
  changeStatus(id: any) {
    this.productCategoryService.changeStatus(id).subscribe();
    window.location.reload();
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

  deleteProductCate(e: Event, productCategoryID: number) {
    e.preventDefault();

    var result = confirm("Bạn có chắc muốn xóa không?");
    if (result == true) {
      this.productCategoryService.deleteProductCate(productCategoryID).subscribe({
        next: (data => {
          if (data?.message) {
            alert(data.message)
          }
          window.location.reload();
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }
  }

  searchProductCate(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product-category/index'], { queryParams: { title: this.title } });
  }
  addProductCate(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product-category/detail']);
  }

}
