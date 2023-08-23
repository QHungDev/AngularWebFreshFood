import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ClientService } from '../../services/client.service';
@Component({
  selector: 'app-vc-header',
  templateUrl: './vc-header.component.html',
  styleUrls: ['./vc-header.component.css']
})

export class VcHeaderComponent implements OnInit {
  length = 0;
  loginUsername: any;
  isLogin=true;
  constructor(private clientService: ClientService, private tokenService: TokenService, private router: Router){ };


  cartDetail(e: Event){
    e.preventDefault();
    this.router.navigate(['/cart']);
  }
  ClientLogin(e: Event) {
    e.preventDefault();
    this.router.navigate(['/login']);
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
  ngOnInit(): void {
    this.loginUsername = this.tokenService.getSession()?.username;
    if(this.loginUsername!= null){
      this.isLogin = false;
    }
    let countCart: any;
    countCart= Object.keys(JSON.parse(localStorage.getItem('localCart')||'{}')).length;
    this.length=countCart;
    console.log("abasdac",countCart);
  }

}
