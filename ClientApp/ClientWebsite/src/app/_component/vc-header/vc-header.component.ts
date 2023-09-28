import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ClientService } from '../../services/client.service';
import { FormBuilder,Validators, FormControl, FormGroup } from '@angular/forms';
import {Observable, map, startWith} from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-vc-header',
  templateUrl: './vc-header.component.html',
  styleUrls: ['./vc-header.component.css']

})

export class VcHeaderComponent implements OnInit {
  /**
   * Form
   */
  keywords = '';
  searchResults: any[] = [];
  length = 0;
  loginUsername: any;
  isLogin=true;
  clients: any[] = [];
  constructor(private activeRoute: ActivatedRoute,private productService: ProductService,private clientService: ClientService, private tokenService: TokenService, private router: Router){

   }
   search(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    if (query.trim() === '') {
      this.searchResults = [];
      return;
    }
    this.productService.fetchSearchResults(query)
      .subscribe(results => {
        this.searchResults = results;
      });
      this.activeRoute.queryParams.subscribe(params => {
        const articlesObservable = this.clientService.clientget();
        articlesObservable.subscribe((clientsData: any[]) => {
          this.clients = clientsData;
        });
    });
  }

   ngOnInit(): void {
    this.loginUsername = this.tokenService.getSession()?.username;
    if(this.loginUsername!= null){
      this.isLogin = false;
    }
    let countCart: any;
    countCart= Object.keys(JSON.parse(localStorage.getItem('localCart')||'{}')).length;
    this.length=countCart;

  }
  searchProduct(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/product/index'], { queryParams: { title: this.keywords } });
  }
  productDetail(e: Event, product: any) {
    e.preventDefault();
    this.router.navigate(['/product/detail'], { queryParams: { productID: product.productID } });
  }
  cartDetail(e: Event){
    e.preventDefault();
    this.router.navigate(['/cart']);
  }
  ClientLogin(e: Event) {
    e.preventDefault();
    this.router.navigate(['/login']);
  }
  clientInfo(e: Event) {
    e.preventDefault();
    this.router.navigate(['/client-info'],{ queryParams: {} });
  }
  ClientRegister(e: Event) {
    e.preventDefault();
    this.router.navigate(['/registerclient']);
  }
  logout(e: Event): void {
    e.preventDefault();

    this.clientService.logout();
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }
  trackCart(e: Event){
    e.preventDefault();
    this.router.navigate(['/client-cart']);
  }

}
