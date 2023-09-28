import { Component, ElementRef, ViewChild } from '@angular/core';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../services/client.service';
import { ErrorResponse } from '../responses/error-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentic-code',
  templateUrl: './authentic-code.component.html',
  styleUrls: ['./authentic-code.component.css']
})
export class AuthenticCodeComponent {
  constructor(private router: Router,private forgotPasswordService: ForgotPasswordService, private toastr: ToastrService, private clientService: ClientService) { }
  @ViewChild('authenticCode1', {static: false}) authenticCode1?: ElementRef;
  @ViewChild('authenticCode2', {static: false}) authenticCode2?: ElementRef;
  @ViewChild('authenticCode3', {static: false}) authenticCode3?: ElementRef;
  @ViewChild('authenticCode4', {static: false}) authenticCode4?: ElementRef;

  value_AuthenticCode1 = "";
  value_AuthenticCode2 = "";
  value_AuthenticCode3 = "";
  value_AuthenticCode4 = "";

  readonly_AuthenticCode1 = false;
  readonly_AuthenticCode2 = true;
  readonly_AuthenticCode3 = true;
  readonly_AuthenticCode4 = true;

  time = 120;
  countTime = "02:00"
  showTime = true
  showAuthenticating = false
  disabledResendAuthenticCode = true;
  interval: any;
  authenticCode = "";
  randomAuthenticCode = "";

  disabledButtonUpdate = false;

  postclientRequest: any = {
    ClientID: 0,
    Email: "",
    FullName:"",
    Password: "",
    RePassword: "",
    Mobile: "",
    Address: "",
    ClientCategoryID: 0
  };
  emailAuthenticCode: any = {
    to: "",
    subject: "",
    body:"",
    code: "",
  };
  ngOnInit(): void {
    this.authenticCode1?.nativeElement.focus()
    this.forgotPasswordService.selectedClientPassword$.subscribe((value) => {
      this.postclientRequest.Email = value.username;
      this.postclientRequest.Password = value.password;
      this.randomAuthenticCode = value.code;
      if (this.postclientRequest.Email) {
        this.showAlert()
        this.countDown()
      }
    });
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


  countDown() {
    this.interval = setInterval(() => {
      this.time--;
      let hours = Math.floor(this.time / 3600);
      let minutes = Math.floor(this.time % 3600 / 60);
      let seconds = Math.floor(this.time % 3600 % 60);

      this.countTime = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
      if (this.time <= 0) {
        clearInterval(this.interval);
        this.showTime = false;
        this.showAuthenticating = false;
        this.disabledResendAuthenticCode = true;
        this.randomAuthenticCode = "";
        // window.location.reload();
      }
    }, 1000);
  }

  changeAuthenticCode(event: any, index: number) {
    switch (index) {
        case 1:
          if (event.trim() == "") {
            return;
          } else {
            this.readonly_AuthenticCode1 = true;
            this.readonly_AuthenticCode2 = false;
            this.authenticCode2?.nativeElement.focus()
          }
        break;

        case 2:
          if (event.trim() == "") {
            return;
          } else {
            this.readonly_AuthenticCode2 = true;
            this.readonly_AuthenticCode3 = false;
            this.authenticCode3?.nativeElement.focus()
          }
        break;

        case 3:
          if (event.trim() == "") {
            return;
          } else {
            this.readonly_AuthenticCode3 = true;
            this.readonly_AuthenticCode4 = false;
            this.authenticCode4?.nativeElement.focus()
          }
        break;

        case 4:
          if (event.trim() == "") {
            return;
          } else {
            this.readonly_AuthenticCode4 = true;
            this.authenticCode1?.nativeElement.focus()

            this.showTime = false;
            this.showAuthenticating = true;
            this.disabledResendAuthenticCode = false;
            setTimeout(() => {
              this.incorrectAuthenticCode();

              this.showTime = true;
              if (this.time <= 0) {
                this.showTime = false;
              }
              this.showAuthenticating = false;
              this.disabledResendAuthenticCode = true;
            },3000);
            // console.log("Đã xác thực thành công!", this.value_AuthenticCode1 + this.value_AuthenticCode2 + this.value_AuthenticCode3 + this.value_AuthenticCode4);
          }
        break;

      default:
        break;
    }
  }

  incorrectAuthenticCode() {
    this.authenticCode = this.value_AuthenticCode1 + this.value_AuthenticCode2 + this.value_AuthenticCode3 + this.value_AuthenticCode4;

    if (this.randomAuthenticCode == "") {
      this.toastr.warning('Mã xác thực đã hết hạn', '', {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
      });
    } else if(this.randomAuthenticCode.toLocaleUpperCase() == this.authenticCode.toLocaleUpperCase()) {
      this.forgotPasswordService.forgotPassword(this.postclientRequest).subscribe({
        next: (data => {
          this.router.navigate(['/login']);
          // window.location.reload();
          // this.toastr.success('Cập nhật thành công', '', {
          //   timeOut: 5000,
          //   positionClass: 'toast-bottom-right',
          //   progressBar: true,
          // });
        }),
        error: ((error: ErrorResponse) => {
          alert(error.Error);
        })
      });
    }
    else {
      this.value_AuthenticCode1 = "";
      this.value_AuthenticCode2 = "";
      this.value_AuthenticCode3 = "";
      this.value_AuthenticCode4 = "";

      this.readonly_AuthenticCode1 = false;
      this.readonly_AuthenticCode2 = true;
      this.readonly_AuthenticCode3 = true;
      this.readonly_AuthenticCode4 = true;

      this.toastr.error('Mã xác thực không đúng', '', {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
      });
    }

  }

  showAlert() {
    this.toastr.success('Mã xác thực đã được gửi đến Email xác nhận của bạn', '', {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
    });
  }

  resendAuthenticCode() {
    if (!this.postclientRequest.Email) {
      alert("Vui lòng nhập lại Email");
      return
    }
    this.randomAuthenticCode = this.randomText();
    this.emailAuthenticCode.to = this.postclientRequest.Email;
    this.emailAuthenticCode.code = this.randomAuthenticCode.toLocaleUpperCase();
    this.clientService.sendEmailAuthenticCode(this.emailAuthenticCode).subscribe({
      next: (data => {
        this.value_AuthenticCode1 = "";
        this.value_AuthenticCode2 = "";
        this.value_AuthenticCode3 = "";
        this.value_AuthenticCode4 = "";

        this.readonly_AuthenticCode1 = false;
        this.readonly_AuthenticCode2 = true;
        this.readonly_AuthenticCode3 = true;
        this.readonly_AuthenticCode4 = true;
        clearInterval(this.interval);
        this.time = 120;
        this.countTime = "02:00";
        this.showTime = true;
        this.countDown();
        this.showAlert();
      }),
      error: ((error: ErrorResponse) => {
        alert(error.Error);
      })
    });
  }

}
