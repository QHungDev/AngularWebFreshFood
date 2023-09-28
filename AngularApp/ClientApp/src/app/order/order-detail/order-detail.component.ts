import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ErrorResponse } from '../../responses/error-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  form: FormGroup;
  postOrderRequest: any = {
    OrderID: "",
    FullName: "",
    Mobile: "",
    Address: "",
    Total: "",
    Bonus: "",
    Amount: "",
    CreateTime: "",
    OrderStatus: "",
    ConfirmStatus: "",
    ChargeStatus: "",
    DeliveStatus: "",
    ClientID: "",
    Client: "",
    OrderDetails: "",
  };
  orderID = '';
  orders: any[] = [];
  orderDetailProduct: any[] = [];
  keywords = '';
  orderStatusList: any[] = [
    {id: 1, title: "Đang Xử Lý"},
    {id: 2, title: "Đã Hoàn Tất"},
    {id: 3, title: "Đã Hủy"},
    ];

  deliveStatusList: any[] = [
    {id: 1, title: "Đang Đóng Gói"},
    {id: 2, title: "Đang Giao"},
    {id: 3, title: "Giao Hàng Thành Công"},
    {id: 4, title: "Đã Hủy"},
    ];

  constructor(private orderService: OrderService, private router: Router,
    public formBuilder: FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute) {
      this.form = this.formBuilder.group({
        orderID: [''],
        fullName: [''],
        mobile: [''],
        address: [''],
        total: [''],
        bonus: [''],
        amount: [''],
        createTime: [''],
        orderStatus: [''],
        confirmStatus: [''],
        chargeStatus: [''],
        deliveStatus: [''],
        clientID: [''],
        client:[''],
        orderDetails:[''],
      });
    }

  ngOnInit(): void {
      this.activeRoute.queryParams.subscribe(params => {
        this.orderID = params.orderID;
        if (this.orderID && this.orderID !== "") {
          const productsObservable = this.orderService.getOrder(this.orderID);
          productsObservable.subscribe((productsData: any) => {
            this.postOrderRequest = productsData;
          });
        }
      });

      this.activeRoute.queryParams.subscribe(params => {
        this.keywords = params.username;

        if (!this.keywords) {
          const ordersObservable = this.orderService.getOrders();
          ordersObservable.subscribe((ordersData: any[]) => {
            this.orders = ordersData;
          });
        }
        else {
          const accountsObservable = this.orderService.searchOrders(this.keywords);
          accountsObservable.subscribe((ordersData: any[]) => {
            this.orders = ordersData;
          });
        }
      });

      this.orderService.getOrderDetailProduct(this.orderID).subscribe(data => {
        this.orderDetailProduct = data
      })
  }

  // showImg(imgName: any) {
  //   //var str = "FileUploads/Product/Avatar/f0f34b03-9f95-4efe-946a-39eb0d467af2.jpg"
  //   var name = imgName.split('/')[4]

  //   var imgUrl = 'https://localhost:7265/api/product/' + name;

  //   return imgUrl;
  // }




  submitForm() {
    // var orderID = this.form.get('orderID')?.value;
    // var clientID = this.form.get('clientID')?.value;
    var fullName = this.form.get('fullName')?.value;
    var mobile = this.form.get('mobile')?.value;
    var address = this.form.get('address')?.value;
    var total = this.form.get('total')?.value;
    var bonus = this.form.get('bonus')?.value;
    var amount = this.form.get('amount')?.value;
    var createTime = this.form.get('createTime')?.value;
    var orderStatus = this.form.get('orderStatus')?.value;
    //var confirmStatus = this.form.get('confirmStatus')?.value;
    //var chargeStatus = this.form.get('chargeStatus')?.value;
    var deliveStatus = this.form.get('deliveStatus')?.value;
    // this.postOrderRequest.OrderID = orderID;
    // this.postOrderRequest.ClientID = clientID;
    this.postOrderRequest.FullName = fullName;
    this.postOrderRequest.Mobile = mobile;
    this.postOrderRequest.Address = address;
    this.postOrderRequest.Total = total;
    this.postOrderRequest.Bonus = bonus;
    this.postOrderRequest.Amount = amount;
    this.postOrderRequest.CreateTime = createTime;
    this.postOrderRequest.OrderStatus = orderStatus;
    // this.postOrderRequest.ConfirmStatus = confirmStatus;
    // this.postOrderRequest.ChargeStatus = chargeStatus;
    this.postOrderRequest.DeliveStatus = deliveStatus;

    if (this.orderID && this.orderID !== ""  && this.postOrderRequest.orderID !== undefined) {
      //Update
      this.orderService.updateOrder(this.orderID, this.postOrderRequest).subscribe({
        next: (data => {
          this.router.navigate(['/order']);
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
