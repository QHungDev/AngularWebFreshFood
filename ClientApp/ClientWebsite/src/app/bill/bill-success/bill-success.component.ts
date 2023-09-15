import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { DatePipe } from '@angular/common';
import { ErrorResponse } from 'src/app/responses/error-response';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-bill-success',
  templateUrl: './bill-success.component.html',
  styleUrls: ['./bill-success.component.css']
})
export class BillSuccessComponent implements OnInit {

  constructor(private router: Router,private cartService : CartService,private clientService : ClientService, private productService: ProductService, public formBuilder: FormBuilder,private activeRoute: ActivatedRoute){
    // this.form = this.formBuilder.group({
    //   orderID: [''],
    //   fullName: [''],
    //   mobile: [''],
    //   address: [''],
    //   total: [''],
    //   bonus: [''],
    //   amount: [''],
    //   createTime: [''],
    //   orderStatus: [''],
    //   confirmStatus: [''],
    //   chargeStatus: [''],
    //   deliveStatus: [''],
    //   clientID: [''],
    //   client:[''],
    //   orderDetails:[''],
    //   email:[''],
    // });
  }
  errorCodes: any;
  orderType: any;
  payment = "cod";
  email: any;
  // form: FormGroup;
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.activeRoute.queryParams.subscribe(params => {
      this.errorCodes = params.errorCode;
      // let countCart: any;
      // countCart = Object.keys(JSON.parse(localStorage.getItem('localCart')||'{}')).length;
      // if (countCart == 0) {
      //   this.errorCodes = 1;
      // }
      if (this.errorCodes == 0) {
        this.buy();
      }
    })
    if (localStorage.getItem('localCart')) {
      this.disabled = false
    } else {
      this.disabled = true
    }
    this.email = "";
    this.orderMoMo.OrderID = 0
    if (localStorage.getItem('Username')) {
      this.email = localStorage.getItem('Username');
      this.clientService.getWithEmail(this.email).subscribe((data) => {
        this.orderRequest.FullName = data.fullName;
        this.orderRequest.Mobile = data.mobile;
        this.orderRequest.Address = data.address;
        // this.form.patchValue({
        //   fullName: data.fullName,
        //   mobile: data.mobile,
        //   address: data.address,
        //   clientID: data.clientID,
        //   email: data.email,
        // });

        this.orderMoMo.OrderID = data.clientID
      });
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
  needPayAll(){
    let needPayAll = this.needPay() + 25000;

    return needPayAll;
  }

  buy(){
    let countCart: any;
    countCart = Object.keys(JSON.parse(localStorage.getItem('localCart')||'{}')).length;
    if (countCart > 0) {
      let Username = localStorage.getItem('Username');
      if (!Username) {
        Username = "basicclient";
      }
      this.clientService.getWithEmail(Username).subscribe((data) => {
        this.userID = data.clientID;

        this.orderRequest.ClientID = this.userID;
        let client: any;
        client = localStorage.getItem('localClient');

        client = JSON.parse(client);

        this.orderRequest.FullName = client.FullName;
        this.orderRequest.Mobile = client.Mobile;
        this.orderRequest.Address = client.Address;
        this.orderRequest.Total = this.needPayAll();

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
            // alert("Thanh Toán Thành Công!");

          }),
          error: ((error: ErrorResponse) => {
            alert("Thanh Toán Không Thành Công!");
          })
        });
      });

    }

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
    let client: any;
    client = localStorage.getItem('localClient');

    client = JSON.parse(client);
    this.emailRequest.To = client.Email
    this.emailRequest.Subject = "Đơn hàng từ FreshFoodStore"
    this.emailRequest.Body = "Đơn hàng từ FreshFoodStore"
    this.emailRequest.Quantity = quantity
    this.activeRoute.queryParams.subscribe(params => {
      this.orderType = params.orderType;
      if (this.orderType == "momo_wallet") {
        this.emailRequest.Payment = "Thanh Toán Qua MOMO"
      }
      else {
        this.emailRequest.Payment = "Thanh Toán Khi Nhận Hàng"
      }
    })
    this.emailRequest.Date = this.pipe.transform(new Date(), 'dd/MM/yyyy');
    this.emailRequest.Products = this.listProductsBuy
    this.emailRequest.Total = new Intl.NumberFormat('vi-vn').format(needPay + 25000) + " VND";

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
    // this.orderMoMo.OrderID = "27"
    // this.orderMoMo.FullName = this.form.get('fullName')?.value
    this.orderMoMo.OrderInfo = ""
    this.orderMoMo.Amount = (needPay + 25000).toString()
    this.orderMoMo.MomoCode = ""
    this.orderMoMo.ReturnUrl = window.location.origin.toString() + '/bill/bill-success'

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
  radioPayment(e:any){
    this.payment = e.target.value;
    // console.log(e.target.value)
    // if (e.target.value == "momo") {
    //   this.showMomo(e)
    // }
  }

  submitForm() {
    // // var orderID = this.form.get('orderID')?.value;
    // // var clientID = this.form.get('clientID')?.value;
    // var fullName = this.form.get('fullName')?.value;
    // var mobile = this.form.get('mobile')?.value;
    // var address = this.form.get('address')?.value;
    // // var total = this.form.get('total')?.value;
    // // var bonus = this.form.get('bonus')?.value;
    // // var amount = this.form.get('amount')?.value;
    // // var createTime = this.form.get('createTime')?.value;
    // // var orderStatus = this.form.get('orderStatus')?.value;
    // //var confirmStatus = this.form.get('confirmStatus')?.value;
    // //var chargeStatus = this.form.get('chargeStatus')?.value;
    // // var deliveStatus = this.form.get('deliveStatus')?.value;
    // // this.postOrderRequest.OrderID = orderID;
    // // this.postOrderRequest.ClientID = clientID;
    // this.postOrderRequest.FullName = fullName;
    // this.postOrderRequest.Mobile = mobile;
    // this.postOrderRequest.Address = address;
    // // this.postOrderRequest.Total = total;
    // // this.postOrderRequest.Bonus = bonus;
    // // this.postOrderRequest.Amount = amount;
    // // this.postOrderRequest.CreateTime = createTime;
    // // this.postOrderRequest.OrderStatus = orderStatus;
    // // this.postOrderRequest.ConfirmStatus = confirmStatus;
    // // this.postOrderRequest.ChargeStatus = chargeStatus;
    // // this.postOrderRequest.DeliveStatus = deliveStatus;

    // console.log("hahahahaha", this.postOrderRequest)

    // if (this.orderID && this.orderID !== ""  && this.postOrderRequest.orderID !== undefined) {
    //   //Update
    //   this.cartService.updateOrder(this.orderID, this.postOrderRequest).subscribe({
    //     next: (data => {
    //       this.router.navigate(['/client-cart']);
    //     }),
    //     error: ((error: ErrorResponse) => {
    //       alert(error.Error);
    //     })
    //   });
    // }
    // else {
    //   alert('error');
    // }
  }
  pay(){
    // this.orderRequest.FullName = this.form.get('fullName')?.value
    // this.orderRequest.Mobile = this.form.get('mobile')?.value
    // this.orderRequest.Address = this.form.get('address')?.value
    if (this.orderRequest.FullName == "" || this.orderRequest.Mobile == "" || this.orderRequest.Address == "") {
      alert("Quý Khách vui lòng nhập đầy đủ thông tin nhận hàng!");
    }
    else {
      if (this.payment == "cod") {
        return
      }
      if (this.payment == "momo") {
        this.showMomo(event!);
        return
      }
    }
    // this.router.navigate(['/client-cart']);
  }
  backIndex(){
    this.router.navigate([window.location.origin.toString()]);
  }

}
