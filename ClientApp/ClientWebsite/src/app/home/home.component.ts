import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ErrorResponse } from '../responses/error-response';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgUrl: string = 'https://localhost:7265/api/product/2.jpg';
  imageToShow: any;
  isImageLoading: boolean |undefined;
  getImageRequest: any = {
    ProductID: "",
    Avatar: "",
  };
  products: any[] = [];

  public productsCart : any = [];
  productList: any = {};
  idCountMap: any = {};
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
  constructor(private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute, private cartService : CartService) { }
  ngOnInit(): void {
    this.getImageFromService();
    this.activeRoute.queryParams.subscribe(params => {
      this.keywords = params.title;
      if (!this.keywords) {
        const productsObservable = this.productService.getProducts();
        productsObservable.subscribe((productsData: any[]) => {
          this.products = productsData;
        });
      }
      else {
        const productsObservable = this.productService.searchProducts(this.keywords);
        productsObservable.subscribe((productsData: any[]) => {
          this.products = productsData;
        });
      }
    });

    this.productsCart = localStorage.getItem('localCart');

    this.productList = JSON.parse(this.productsCart);

    this.countDuplicates();
  }

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

  // showImg(imgName: any) {
  //   //var str = "FileUploads/Product/Avatar/f0f34b03-9f95-4efe-946a-39eb0d467af2.jpg"
  //   var name = imgName.split('/')[4]

  //   var imgUrl = 'https://localhost:7265/api/product/' + name;

  //   return imgUrl;
  // }

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
       this.productService.getImage(this.imgUrl).subscribe(data => {
         this.createImageFromBlob(data);
         this.isImageLoading = false;
       }, error => {
         this.isImageLoading = false;
         console.log(error);
       });
   }
  searchProduct(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product/index'], { queryParams: { title: this.keywords } });
  }
  addProduct(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product/detail']);
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
