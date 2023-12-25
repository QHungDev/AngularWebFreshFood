import { Component, OnInit, getNgModuleById } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { CartResponse } from 'src/app/responses/cart-response';
import { sellTodayEndTime, sellTodayStartTime } from 'src/app/responses/sell-today-time';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit{


  maxRate = 5;
  rate = 4;

  overStar: number|undefined;
  titleRating = "Rất Tốt"

  hoveringOver(value: number): void {

    switch (value) {
      case 1:
        this.titleRating = "Tệ"
      break;
      case 2:
        this.titleRating = "Tạm Được"
      break;
      case 3:
        this.titleRating = "Bình Thường"
      break;
      case 4:
        this.titleRating = "Tốt"
      break;
      case 5:
        this.titleRating = "Rất Tốt"
      break;

      default:
        break;
    }

    this.overStar = value;
  }

  resetStar(): void {
    this.overStar = void 0;
  }

  cartResponse: CartResponse = {
    ProductID: "",
    Title: "",
    Price: ""
  };
  editorConfig = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',        // Suffix to use when loading resources
    plugins: 'lists link image table wordcount'
  }
  uploadedImage: File| undefined;
  imgModified:any;
  productCategories: any[] = [];
  productComment: any[] = [];
  form: FormGroup;
  formCommentProduct:FormGroup;
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
    ProductCategoryID: "",
    IsSellToday: false
  };
  postProductComment:any={
    ProductCommentID:"",
    ClientID:"",
    ProductID: "",
    CreateTime:new Date(),
    Status:true,
    Content:"",
    Rate: this.rate
  };
  productCommentID='';
  clientID='';
  productID = '';
  quantityProduct = 1;
  quantityInCart = 0;


  public products : any = [];
  productList: any = {};


  sellTodayStartTime = sellTodayStartTime;
  sellTodayEndTime = sellTodayEndTime;

  time = 0;
  timeMax = 0;
  countTime = "00:00:00"
  showSellToday = false;

  interval: any;


  constructor(private cartService : CartService, private productService: ProductService, private clientService : ClientService, private router: Router,
    public formBuilder: FormBuilder,public formComment:FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute, private toastr: ToastrService) {
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
      status: [true],
      comment: [''],
      ratingProduct: [''],
      ratingComment: ['']
    });
    this.formCommentProduct = this.formComment.group({
      clientID:"",
      productID: "",
      createTime:[''],
      status: [true],
      content:"",
    })
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (localStorage.getItem('Username')) {
      this.clientService.getWithEmail(localStorage.getItem('Username')).subscribe((data) => {
        this.clientID = data.clientID
      });
    }
    if (this.productID && this.productID !== "") {
      const productsCommentObservable = this.productService.getProductComment(this.clientID);
      productsCommentObservable.subscribe((productsCommentData: any) => {
        this.postProductComment = productsCommentData;
      });
    }

    const productsObservable = this.productService.getProductCategories();
    productsObservable.subscribe((productsData: any[]) => {
      this.productCategories = productsData;

      this.activeRoute.queryParams.subscribe(params => {
        this.productID = params.productID;

        this.products = localStorage.getItem('localCart');
        this.productList = JSON.parse(this.products);
        if (this.productList != null && this.productList != undefined) {
          this.productList = this.productList.filter((x: any) => x.productID == this.productID);
          this.quantityInCart = this.productList.length;
        }

        if (this.productID && this.productID !== "") {
          const productsObservable = this.productService.getProduct(this.productID);
          productsObservable.subscribe((productsData: any) => {
            this.postProductRequest = productsData;
            if (this.postProductRequest.isSellToday) {
              if (((new Date()).getTime() > (new Date(new Date().setHours(this.sellTodayStartTime.hours, this.sellTodayStartTime.minutes, this.sellTodayStartTime.seconds, this.sellTodayStartTime.milliSeconds))).getTime()) &&
                ((new Date()).getTime() < (new Date(new Date().setHours(this.sellTodayEndTime.hours, this.sellTodayEndTime.minutes, this.sellTodayEndTime.seconds, this.sellTodayEndTime.milliSeconds))).getTime())) {

                this.showSellToday = true;
                this.countDown()
              }
            }
          });
        }

        this.loadAllComment()
      });
    });

  }

  addition() {
    if (this.quantityProduct == this.postProductRequest.quantity) {
      return
    }
    this.quantityProduct += 1
  }

  subtraction() {
    if (this.quantityProduct == 1) {
      return
    }
    this.quantityProduct -= 1
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

  // }
  addtoCart(item: any){
    if (
      (((new Date()).getTime() < (new Date(new Date().setHours(this.sellTodayStartTime.hours, this.sellTodayStartTime.minutes, this.sellTodayStartTime.seconds, this.sellTodayStartTime.milliSeconds))).getTime()) ||
      ((new Date()).getTime() > (new Date(new Date().setHours(this.sellTodayEndTime.hours, this.sellTodayEndTime.minutes, this.sellTodayEndTime.seconds, this.sellTodayEndTime.milliSeconds))).getTime())) &&
      item.isSellToday)
      {
        item.price = Math.round(item.price * (50/100))
      }

    if ((this.quantityProduct + this.quantityInCart) > this.postProductRequest.quantity) {
      return
    }
    for (let i = 1; i <= this.quantityProduct; i++) {
      this.cartService.addtoCartLocal(item);
    }
    window.location.reload();
  }
    async add() {
      await this.addImg();
    }



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

    percent(price:any, oldPrice: any, isSellToday: boolean){
      if (isSellToday) {
        return 50
      } else {
        return Math.round((((oldPrice - price)/oldPrice)*100)*10^2)/10^2
      }
    }

    countDown() {
      this.timeMax = ((new Date(new Date().setHours(this.sellTodayEndTime.hours, this.sellTodayEndTime.minutes, this.sellTodayEndTime.seconds, this.sellTodayEndTime.milliSeconds))).getTime() - (new Date(new Date().setHours(this.sellTodayStartTime.hours, this.sellTodayStartTime.minutes, this.sellTodayStartTime.seconds, this.sellTodayStartTime.milliSeconds))).getTime())/1000;

      let time = ((new Date(new Date().setHours(this.sellTodayEndTime.hours, this.sellTodayEndTime.minutes, this.sellTodayEndTime.seconds, this.sellTodayEndTime.milliSeconds))).getTime() - (new Date()).getTime())/1000;
      this.time = time;
      setTimeout(() => {
        window.location.reload();
      }, time*1000);
      this.interval = setInterval(() => {
        this.time--;
        let hours = Math.floor(this.time / 3600);
        let minutes = Math.floor(this.time % 3600 / 60);
        let seconds = Math.floor(this.time % 3600 % 60);
        this.countTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
        if (this.time <= 0) {
          clearInterval(this.interval);
          this.countTime = "00:00:00"
          this.showSellToday = false;

        }
      }, 1000);
    }

    saleOff(price:any, oldPrice: any, isSellToday: boolean){
      if (
        (((new Date()).getTime() < (new Date(new Date().setHours(this.sellTodayStartTime.hours, this.sellTodayStartTime.minutes, this.sellTodayStartTime.seconds, this.sellTodayStartTime.milliSeconds))).getTime()) ||
        ((new Date()).getTime() > (new Date(new Date().setHours(this.sellTodayEndTime.hours, this.sellTodayEndTime.minutes, this.sellTodayEndTime.seconds, this.sellTodayEndTime.milliSeconds))).getTime())) &&
        isSellToday)
        {
          return [Math.round(price * (50/100)), price, 50]
        }

      return [price, oldPrice, Math.round((((oldPrice - price)/oldPrice)*100)*10^2)/10^2]

    }

    loadAllComment(){
      if (this.productID && this.productID !== "") {
        this.productService.getProductComment(this.productID).subscribe((productsCommentData: any) => {
          this.productComment = productsCommentData;
        });
      }

    }

    splitName(name: any){
      return name.split("", 1)[0];
    }

    sendComment() {

      if (!this.clientID || this.clientID == "" || this.clientID == "0") {
        this.toastr.error('Vui lòng đăng nhập', '', {
          timeOut: 5000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        return
      }

      var Comment = this.form.get('comment')?.value;
      if (Comment.trim() == "") {
        this.toastr.error('Để lại ý kiến của bạn', '', {
          timeOut: 5000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
        this.form.controls['comment'].setValue('');
        return
      }
      this.postProductComment.ProductCommentID = 0;
      this.postProductComment.ClientID = this.clientID;
      this.postProductComment.ProductID = this.productID;
      this.postProductComment.Content = Comment;
      this.postProductComment.Rate = this.rate;

      this.productService.postProductComment(this.postProductComment).subscribe({
        next: (data => {
          this.form.controls['comment'].setValue('');
          this.showAlert()
          this.loadAllComment()
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      })
    }

    showAlert() {
      this.toastr.success('Cám ơn bạn đã góp ý về sản phẩm!', '', {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
      });
    }

  }
