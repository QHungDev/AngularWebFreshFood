import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ErrorResponse } from '../responses/error-response';
import { DatePipe } from '@angular/common';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private router: Router,private cartService : CartService, private productService: ProductService){}
  public products : any = [];
  productList: any = {};
  productData: any[] = [];
  element:any;
  //idCountMap: { [id: string]: number } = {};
  idCountMap: any = {};
  groupedData: any[] = [];
  jsonData: any[] = [];
  disabled = true;
  userID: any;
  orderRequest: any = {
    OrderID: 0,
    FullName: "",
    Mobile: "",
    Address: "",
    Total: 0,
    Bonus: 0,
    Amount: 0,
    CreateTime: new Date(),
    OrderStatus: 1,
    ConfirmStatus: false,
    ChargeStatus: true,
    DeliveStatus: 1,
    ClientID: 0,
  };
  orderDetailRequest: any = {
    OrderID: 0,
    ProductID: 0,
    Quantity: 0,
    Price: 0,
  };
  emailRequest: any = {
    To: "",
    Subject: "",
    Body: "",
    Quantity: "",
    Payment: "",
    Date: "",
    Products: [],
    Total: "",
  };
  orderMoMo: any = {
    OrderID: "",
    FullName: "",
    OrderInfo: "",
    Amount: "",
    MomoCode: "",
    ReturnUrl: "",
  }
  listProductsBuy: any[] = [];
  pipe = new DatePipe('en-US');

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

  ngOnInit(): void {
    if (localStorage.getItem('Username') && localStorage.getItem('localCart')) {
      this.disabled = false
    } else {
      this.disabled = true
    }

    this.products = localStorage.getItem('localCart');

    this.productList = JSON.parse(this.products);

    this.countDuplicates();
  }
  // increaseCount(id: string): void {
  //   if (this.idCountMap[id]) {
  //     this.idCountMap[id]++;
  //   } else {
  //     this.idCountMap[id] = 1;
  //   }
  // }

  // decreaseCount(id: string): void {
  //   if (this.idCountMap[id]) {
  //     this.idCountMap[id]--;
  //   }
  // }
  countDuplicates(): void {
    for (const item of this.productList) {
      const id = item.productID;
      if (this.idCountMap[id]) {
        this.idCountMap[id]++;
      } else {
        this.idCountMap[id] = 1;
      }
    }

    const entries = Object.entries(this.idCountMap);

    for (const item of entries) {
      const id = item[0];
      for (const productDetail of this.productList) {
            if (!this.checkDuplicate(productDetail.productID)) {
              if (productDetail.productID == id) {
                this.productData.push(productDetail);
              }
            }
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

  checkDuplicate(id: any){
    let counter = 0;
    for (const item of this.productData) {
      if (item.productID === id) {
        counter += 1;
      }
    }
    if(counter >= 1) {
      return true;
    }
    return false;
  }

  totalPrice(id: any){
    let total = 0;
    const productPrice = this.productData.find(x => x.productID == id).price;
    const count = this.selectCount(id)
    total = productPrice * count;
    return total;
  }

  needPay(){
    let needPay = 0;
    for (const item of this.productData) {
      const productPrice = item.price;
      const count = this.selectCount(item.productID)
      const total = productPrice * count;
      needPay += total;
    }
    return needPay;
  }
  removeProduct(id: any) {
    let newproductList: any;
    newproductList = this.productList.filter((element: any) =>{
      return element.productID != id
    });
    this.cartService.removetoCartLocal(newproductList);
    window.location.reload();
  }

  showImg(imgName: any) {
    //var str = "FileUploads/Product/Avatar/f0f34b03-9f95-4efe-946a-39eb0d467af2.jpg"
    var name = imgName.split('/')[4]

    var imgUrl = 'https://localhost:7265/api/product/' + name;

    return imgUrl;
  }

  buy(){
    this.userID = localStorage.getItem('Username');
    this.orderRequest.FullName = this.userID;
    this.orderRequest.Total = this.needPay();

    let countCart: any;
    countCart = Object.keys(JSON.parse(localStorage.getItem('localCart')||'{}')).length;

    this.orderRequest.Amount = countCart;
    this.orderRequest.OrderStatus = 1;
    this.orderRequest.ConfirmStatus = false;
    this.orderRequest.DeliveStatus = 1;

    this.cartService.addOrder(this.orderRequest).subscribe({
      next: (data => {
        const entries = Object.entries(this.idCountMap);
        for (const item of entries) {
          const id = item[0];
          const quantity = item[1];
          this.orderDetailRequest.OrderID = data.orderID;
          this.orderDetailRequest.ProductID = id;
          this.orderDetailRequest.Quantity = quantity;
          // this.listProductsBuy.push(this.orderDetailRequest.ProductID);
          this.listProductsBuy.push(
            {
              ProductID: this.orderDetailRequest.ProductID,
              Quantity: this.orderDetailRequest.Quantity
            });
          this.cartService.addOrderDetail(this.orderDetailRequest).subscribe();
        }

        localStorage.removeItem('localCart');
        this.sendEmail();
        window.location.reload();
        alert("Thanh Toán Thành Công!");

      }),
      error: ((error: ErrorResponse) => {
        alert("Thanh Toán Không Thành Công!");
      })
    });
  }

  sendEmail(){
    let needPay = 0;
    let quantity = 0;
    for (const item of this.productData) {
      const productPrice = item.price;
      const count = this.selectCount(item.productID)
      const total = productPrice * count;
      quantity += count;
      needPay += total;
    }
    this.emailRequest.To = "truongquochung204@gmail.com"
    this.emailRequest.Subject = "Đơn hàng từ FreshFoodStore"
    this.emailRequest.Body = "Đơn hàng từ FreshFoodStore"
    this.emailRequest.Quantity = quantity
    this.emailRequest.Payment = "Thanh Toán Qua MOMO"
    this.emailRequest.Date = this.pipe.transform(new Date(), 'dd/MM/yyyy');
    this.emailRequest.Products = this.listProductsBuy
    this.emailRequest.Total = new Intl.NumberFormat('vi-vn').format(needPay) + " VND";

    this.cartService.sendEmail(this.emailRequest).subscribe();

  }
  showMomo(e: Event): void{
    e.preventDefault();
    // console.log(((new Date().getTime() * 10000) + 621355968000000000))
    let needPay = 0;
    for (const item of this.productData) {
      const productPrice = item.price;
      const count = this.selectCount(item.productID)
      const total = productPrice * count;
      needPay += total;
    }
    this.orderMoMo.OrderID = "27"
    this.orderMoMo.FullName = "PhuongPhuong"
    this.orderMoMo.OrderInfo = ""
    this.orderMoMo.Amount = needPay.toString()
    this.orderMoMo.MomoCode = ""
    this.orderMoMo.ReturnUrl = window.location.origin.toString()

    this.cartService.sendMomo(this.orderMoMo).subscribe({
      next: (data => {
        if (data?.status) {
          if (data?.url) {
            // console.log(data.url)
            window.location.href = data.url
          }
        } else {
          alert("Vui lòng chọn cách thức thanh toán khác!");
        }

      }),
      error: ((error: ErrorResponse) => {
        alert(error.Error);
      })
    });

    //console.log("linkkkkk", window.location.host)

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

  subtraction(productID: any) {
    const productsObservable = this.productService.getProduct(productID);
    productsObservable.subscribe((productsData: any) => {
      this.postProductRequest = productsData;
      if (this.selectCount(productID) == 1) {
        this.removeProduct(productID)
      }
      else {
        this.removeProduct(productID)
        for (let i = 1; i <= this.selectCount(productID) - 1; i++) {
          this.cartService.addtoCartLocal(this.postProductRequest);
        }
      }
      window.location.reload()
    });
  }

  billDetail() {
    this.router.navigate(['/bill/bill-detail']);
  }
}
