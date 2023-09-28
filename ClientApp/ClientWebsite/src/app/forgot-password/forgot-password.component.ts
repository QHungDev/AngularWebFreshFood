import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../requests/login-request';
import { ErrorResponse } from '../responses/error-response';
import { ClientService } from '../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from '../services/forgot-password.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private clientService: ClientService,private forgotPasswordService: ForgotPasswordService, private router: Router, private toastr: ToastrService) { }

  emailAuthenticCode: any = {
    to: "",
    subject: "",
    body:"",
    code: "",
  };

  disabledButtonUpdate: boolean = false;
  ngOnInit(): void {

  }

  forgotPasswordForm = new FormGroup({
    usernameControl: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    passwordControl: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    repasswordControl: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    rememberPasswordControl: new FormControl("true"),
  });

  get UsernameControl(): FormControl {
    return this.forgotPasswordForm.get("usernameControl") as FormControl;
  }

  get PasswordControl(): FormControl {
    return this.forgotPasswordForm.get("passwordControl") as FormControl;
  }

  get RePasswordControl(): FormControl {
    return this.forgotPasswordForm.get("repasswordControl") as FormControl;
  }

  get RememberPasswordControl(): FormControl {
    return this.forgotPasswordForm.get("rememberPasswordControl") as FormControl;
  }

  reloadPage(): void {
    window.location.reload();
  }

  randomText(){
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: 4 },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
  }

  onSubmit() {
    let randomAuthenticCode = this.randomText();
    if (this.forgotPasswordForm.value.usernameControl != null && this.forgotPasswordForm.value.usernameControl != ""
      && this.forgotPasswordForm.value.passwordControl != null && this.forgotPasswordForm.value.passwordControl != ""
      && this.forgotPasswordForm.value.repasswordControl != null && this.forgotPasswordForm.value.repasswordControl != "") {
      if (this.forgotPasswordForm.value.repasswordControl == this.forgotPasswordForm.value.passwordControl) {
        let clientPassword = {
          username: this.forgotPasswordForm.value.usernameControl,
          password: this.forgotPasswordForm.value.passwordControl,
          code: randomAuthenticCode,
        }
        this.forgotPasswordService.setClientPassword(clientPassword);

        this.disabledButtonUpdate = true
        this.emailAuthenticCode.to = this.forgotPasswordForm.value.usernameControl;
        this.emailAuthenticCode.code = randomAuthenticCode.toLocaleUpperCase();
        this.clientService.sendEmailAuthenticCode(this.emailAuthenticCode).subscribe({
          next: (data => {
            this.disabledButtonUpdate = false
            this.router.navigate(['/authentic-code']);
          }),
          error: ((error: ErrorResponse) => {
            this.disabledButtonUpdate = false
            alert(error.Error);
          })
        });
      }
      else {
        alert("Mật khẩu không trùng khớp");
        return;
      }
    }
    else {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
  }
}
