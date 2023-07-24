import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ErrorResponse } from '../../responses/error-response';
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})

export class ProductIndexComponent implements OnInit {
  imgUrl: string = 'https://localhost:7265/api/product/2.jpg';
  imageToShow: any;
  isImageLoading: boolean |undefined;
  getImageRequest: any = {
    ProductID: "",
    Avatar: "",
  };
  products: any[] = [];

  keywords = '';
  constructor(private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getImageFromService();
    this.activeRoute.queryParams.subscribe(params => {
      this.keywords = params.title;
      if (!this.keywords) {
        const productsObservable = this.productService.getProducts();
        productsObservable.subscribe((productsData: any[]) => {
          this.products = productsData;
          console.log("abc",this.products);
        });
      }
      else {
        const productsObservable = this.productService.searchProducts(this.keywords);
        productsObservable.subscribe((productsData: any[]) => {
          this.products = productsData;
        });
      }
    });
  }

  showImg(imgName: any) {
    //var str = "FileUploads/Product/Avatar/f0f34b03-9f95-4efe-946a-39eb0d467af2.jpg"
    var name = imgName.split('/')[4]
    
    var imgUrl = 'https://localhost:7265/api/product/' + name;
    
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
  editProduct(e: Event, product: any) {
    e.preventDefault();
    this.router.navigate(['/product/detail'], { queryParams: { productID: product.productID } });
  }
  deleteProduct(e: Event, productID: number) {
    e.preventDefault();

    var result = confirm("Bạn có chắc muốn xóa không?");
    if (result == true) {
      this.productService.deleteProduct(productID).subscribe({
        next: (data => {
          window.location.reload();
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }
  }
}
