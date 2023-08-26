import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ErrorResponse } from 'src/app/responses/error-response';

@Component({
  selector: 'app-client-cart-index',
  templateUrl: './client-cart-index.component.html',
  styleUrls: ['./client-cart-index.component.css']
})
export class ClientCartIndexComponent implements OnInit{
  constructor(private router: Router,private cartService : CartService){ };
  order: any[] = [];
  UserEmail: any = "";
  ngOnInit(): void {
    this.UserEmail = localStorage.getItem('Username')
    this.cartService.getOrder(this.UserEmail).subscribe(data => {
      this.order = data
    })
  }

  showDetail(e: Event, orderID: any){
    e.preventDefault();
    this.router.navigate(['/client-cart']);
    this.router.navigate(['/client-cart/detail'], { queryParams: { orderID: orderID } });
  }

  cancelOrder(e: Event, orderID: any){
    var result = confirm("Bạn Có Chắc Muốn Hủy Đơn Hàng?");
    if (result) {
      this.cartService.cancelOrder(orderID).subscribe({
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
