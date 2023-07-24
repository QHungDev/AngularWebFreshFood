import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-vc-admin-setting',
  templateUrl: './vc-admin-setting.component.html',
  styleUrls: ['./vc-admin-setting.component.css']
})
export class VcAdminSettingComponent implements OnInit {
  loginUsername: any;

  constructor(private accountService: AccountService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.loginUsername = this.tokenService.getSession()?.username;
  }

  logout(e: Event): void {
    e.preventDefault();

    this.accountService.logout();
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }
}
