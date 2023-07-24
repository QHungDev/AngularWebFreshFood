import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Router } from '@angular/router';
import { LoginRequest } from '../requests/login-request';
import { ErrorResponse } from '../responses/error-response';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = {
    Username: "",
    Password: ""
  };

  isLoggedIn = false;
  isLoginFailed = false;
  error: ErrorResponse = { Error: '', ErrorCode: '0' };

  constructor(private accountService: AccountService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    let isLoggedIn = this.tokenService.isLoggedIn();
    //console.log(`isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      this.isLoggedIn = true;

      console.log('Bạn đã đăng nhập');

      //Chuyển về trang home
      this.router.navigate(['']);
    }
  }

  loginForm = new FormGroup({
    usernameControl: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    passwordControl: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    rememberPasswordControl: new FormControl("true"),
  });

  get UsernameControl(): FormControl {
    return this.loginForm.get("usernameControl") as FormControl;
  }

  get PasswordControl(): FormControl {
    return this.loginForm.get("passwordControl") as FormControl;
  }

  get RememberPasswordControl(): FormControl {
    return this.loginForm.get("rememberPasswordControl") as FormControl;
  }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmit() {
    this.loginRequest.Username = this.loginForm.value.usernameControl;
    this.loginRequest.Password = this.loginForm.value.passwordControl;

    this.accountService.login(this.loginRequest).subscribe({
      next: (data => {
        this.tokenService.saveSession(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.reloadPage();
      }),
      error: ((error: ErrorResponse) => {
        this.error = error;
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      })
    });
  }
}
