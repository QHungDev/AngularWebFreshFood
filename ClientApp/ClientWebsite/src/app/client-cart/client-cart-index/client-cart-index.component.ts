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
  ngOnInit(): void {
  let UserId= localStorage.getItem('Username')


   }
}
