import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductMainCategoryService } from 'src/app/services/product-main-category.service';
import { ErrorResponse } from '../../responses/error-response';

@Component({
  selector: 'app-product-main-category-index',
  templateUrl: './product-main-category-index.component.html',
  styleUrls: ['./product-main-category-index.component.css']
})
export class ProductMainCategoryIndexComponent implements OnInit {
  productMainCategories: any[] = [];
  keywords = '';
  constructor(private productMainCategoryService: ProductMainCategoryService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }
  ngOnInit(): void {

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
  changeStatus(id: any) {
    this.productMainCategoryService.changeStatus(id).subscribe();
    window.location.reload();
  }

  editProductMainCategory(e: Event, productMainCategories: any) {
    e.preventDefault();
    this.router.navigate(['/product-main-category/detail'], { queryParams: { productMainCategoryID: productMainCategories.productMainCategoryID } });
  }

  searchProductMain(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product-main-category/index'], { queryParams: { title: this.keywords } });
  }
  addProductMain(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product-main-category/detail']);
  }

  deleteProductMain(e: Event, productMainCategoryID: number) {
    e.preventDefault();

    var result = confirm("Bạn có chắc muốn xóa không?");
    if (result == true) {
      this.productMainCategoryService.deleteProductMain(productMainCategoryID).subscribe({
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
}
