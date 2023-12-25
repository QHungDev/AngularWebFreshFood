import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-vc-navigation',
  templateUrl: './vc-navigation.component.html',
  styleUrls: ['./vc-navigation.component.css']
})
export class VcNavigationComponent implements OnInit {

  constructor(private orderService: OrderService) { }
  count: number = 0
  roleAccount: any
  ngOnInit(): void {
    if (localStorage.getItem("Username")) {
      this.roleAccount = localStorage.getItem('Username')
    }
    const ordersObservable = this.orderService.getOrders();
        ordersObservable.subscribe((ordersData: any[]) => {
          if (ordersData !== null && ordersData !== undefined) {
            this.count = ordersData.length
          }
        });
  }

}
