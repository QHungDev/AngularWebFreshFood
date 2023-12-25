import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit{
  constructor(private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute, private cartService : CartService) { }

    ngOnInit(): void {
      this.activeRoute.queryParams.subscribe(params => {
        this.keywords = params.title;

        if (!this.keywords) {
          const productssObservable = this.productService.getProducts();
          productssObservable.subscribe((productsData: any[]) => {
            this.products = productsData;
          });
        }
        else {
          const productssObservable = this.productService.searchProducts(this.keywords);
          productssObservable.subscribe((productsData: any[]) => {
            this.products = productsData;
          });
        }
      });
    }

    products: any[] = [];
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

    keywords = '';
    idCountMap: any = {};
    productList: any = {};
    countDuplicates(): void {
      for (const item of this.productList) {
        const id = item.productID;
        if (this.idCountMap[id]) {
          this.idCountMap[id]++;
        } else {
          this.idCountMap[id] = 1;
        }
      }
    }
    selectCount(id: any){
      let count = 0;
      if (this.idCountMap[id]) {
        count = this.idCountMap[id];
      }
      return count;
    }
  addition(productID: any) {
    const productsObservable = this.productService.getProduct(productID);
    productsObservable.subscribe((productsData: any) => {
      this.postProductRequest = productsData;
      if (this.selectCount(productID) == this.postProductRequest.quantity) {
        return
      }

      this.cartService.addtoCartLocal(this.postProductRequest);
      window.location.reload()
    });
  }
  detailProduct(e: Event, product: any) {
    e.preventDefault();
    this.router.navigate(['/product/detail'], { queryParams: { productID: product.productID } });
  }
  percent(price:any, oldPrice: any){
    // (price/oldPrice)*100
    return Math.round((((oldPrice - price)/oldPrice)*100)*10^2)/10^2
  }
}

