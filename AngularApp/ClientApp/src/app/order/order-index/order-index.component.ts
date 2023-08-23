import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ErrorResponse } from '../../responses/error-response';
@Component({
  selector: 'app-order-index',
  templateUrl: './order-index.component.html',
  styleUrls: ['./order-index.component.css']
})
export class OrderIndexComponent implements OnInit {
  orders: any[] = [];
  keywords = '';
  constructor(private orderService: OrderService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(params => {
      this.keywords = params.username;

      if (!this.keywords) {
        const ordersObservable = this.orderService.getOrders();
        ordersObservable.subscribe((ordersData: any[]) => {
          this.orders = ordersData;
        });
      }
      else {
        const ordersObservable = this.orderService.searchOrders(this.keywords);
        ordersObservable.subscribe((ordersData: any[]) => {
          this.orders = ordersData;
        });
      }
    });
  }

  changeConfirmStatus(id: any) {
    this.orderService.changeConfirmStatus(id).subscribe();
    window.location.reload();
  }

  editOrder(e: Event, order: any) {
    e.preventDefault();
    this.router.navigate(['/order/detail'], { queryParams: { orderID: order.orderID } });
  }

}
