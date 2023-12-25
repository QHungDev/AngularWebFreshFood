import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ErrorResponse } from '../responses/error-response';
import { CartService } from '../services/cart.service';
import { sellTodayEndTime, sellTodayStartTime } from '../responses/sell-today-time';

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
  productsWithCreateTime: any[] = [];
  productsWithQuantity: any[] = [];

  productSellToday: any[] = [];

  // sellTodayStartTime = {
  //   hours: 7,
  //   minutes: 30,
  //   seconds: 0,
  //   milliSeconds: 0
  // };
  sellTodayStartTime = sellTodayStartTime;
  sellTodayEndTime = sellTodayEndTime;

  // sellTodayEndTime = {
  //   hours: 16,
  //   minutes: 30,
  //   seconds: 0,
  //   milliSeconds: 0
  // };
  time = 0;
  timeMax = 0;
  countTime = "00:00:00"
  showSellToday = false;

  interval: any;


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
    this.productService.getProductSellToday().subscribe((data: any) => {
      this.productSellToday = data;
      console.log(this.productSellToday)
    });
    if (((new Date()).getTime() > (new Date(new Date().setHours(this.sellTodayStartTime.hours, this.sellTodayStartTime.minutes, this.sellTodayStartTime.seconds, this.sellTodayStartTime.milliSeconds))).getTime()) &&
        ((new Date()).getTime() < (new Date(new Date().setHours(this.sellTodayEndTime.hours, this.sellTodayEndTime.minutes, this.sellTodayEndTime.seconds, this.sellTodayEndTime.milliSeconds))).getTime()) )
        {

          this.showSellToday = true;
          this.countDown()
        }



    this.getImageFromService();
    this.activeRoute.queryParams.subscribe(params => {
      this.keywords = params.title;
      if (!this.keywords) {
        const productsObservable = this.productService.getProducts();
        productsObservable.subscribe((productsData: any[]) => {
          this.products = productsData;
        });
        this.productService.getAllWithCreateTime().subscribe((data: any) => {
          this.productsWithCreateTime = data
        })
        this.productService.getAllWithQuantity().subscribe((data: any) => {
          this.productsWithQuantity = data
        })
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


  countDown() {
    this.timeMax = ((new Date(new Date().setHours(this.sellTodayEndTime.hours, this.sellTodayEndTime.minutes, this.sellTodayEndTime.seconds, this.sellTodayEndTime.milliSeconds))).getTime() - (new Date(new Date().setHours(this.sellTodayStartTime.hours, this.sellTodayStartTime.minutes, this.sellTodayStartTime.seconds, this.sellTodayStartTime.milliSeconds))).getTime())/1000;;

    // console.log((3662 % 3600 % 60))
    // console.log(((new Date('2023-09-18T16:00')).getTime() - (new Date('2023-09-18T06:06:40')).getTime())/1000);
    // console.log(((new Date(new Date().setHours(16,0,0,0))).getTime() - (new Date()).getTime())/1000);

    let time = ((new Date(new Date().setHours(this.sellTodayEndTime.hours, this.sellTodayEndTime.minutes, this.sellTodayEndTime.seconds, this.sellTodayEndTime.milliSeconds))).getTime() - (new Date()).getTime())/1000;
    this.time = time;
    setTimeout(() => {
      window.location.reload();
    }, time*1000);
    // let time = 120
    this.interval = setInterval(() => {
      this.time--;
      let hours = Math.floor(this.time / 3600);
      let minutes = Math.floor(this.time % 3600 / 60);
      let seconds = Math.floor(this.time % 3600 % 60);
      // console.log(hours + " " + minutes + " " + seconds);
      this.countTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
      // this.countTime = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
      if (this.time <= 0) {
        clearInterval(this.interval);
        this.countTime = "00:00:00"
        this.showSellToday = false;
        // this.showTime = false;
        // this.showAuthenticating = false;
        // this.disabledResendAuthenticCode = true;
        // this.randomAuthenticCode = "";
        // window.location.reload();
      }
    }, 1000);
  }

  discount(price: any){

    return Math.round(price * (50/100))
  }

}
